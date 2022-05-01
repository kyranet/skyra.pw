import type { CustomCommands } from '@config/types/ConfigurableData';
import type { CustomCommand } from '@config/types/GuildSettings';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { Theme, useTheme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectWithLabel from '@mods/Formik/SelectWithLabel';
import TextField from '@mods/Formik/TextField';
import GfmReactMarkdown from '@mods/ReactMarkdown/GfmReactMarkdown';
import SimpleGrid from '@mui/SimpleGrid';
import ColorPicker from '@presentational/ColorPicker/ColorPicker';
import { parse, REGEXP } from '@utils/Color';
import type { AnyRef } from '@utils/util';
import { FastField, Formik, FormikConfig } from 'formik';
import React, { forwardRef, Fragment, memo, useMemo } from 'react';
import { Components, Virtuoso } from 'react-virtuoso';
import { boolean, object, string } from 'yup';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bottomSection: {
			marginTop: theme.spacing(5)
		},
		tagHeader: {
			textDecoration: 'underline',
			fontWeight: 'bolder'
		},
		button: {
			[theme.breakpoints.only('md')]: {
				minHeight: 60
			}
		},
		errorLabelTop: {
			position: 'absolute',
			top: theme.spacing(6.5)
		},
		errorLabelBottom: {
			position: 'absolute',
			bottom: theme.spacing(-0.5),
			top: 'unset'
		},
		contentBoxPadding: {
			paddingBottom: theme.spacing(3)
		},
		virtualizedList: {
			margin: theme.spacing(1)
		}
	})
);

const CustomCommandSettings = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	const validationSchema = object({
		id: string()
			.required('A tag must have a name')
			.max(50, 'A tag name must be 50 or less characters long.')
			.matches(/[^`\u200B]/, {
				excludeEmptyString: true,
				message: 'A tag name may not have a grave accent nor invisible characters.'
			}),
		content: string().required('A custom command must have content to send').max(1950, 'Custom command length cannot exceed 1950 characters'),
		color: string()
			.required()
			.default('#1E88E5')
			.matches(REGEXP.HEX, 'That is not a valid colour, please use the colour picker or type a valid HEX colour.')
			.ensure(),
		embed: boolean().defined().default(false)
	});

	const mergeCustomCommands = (prev: CustomCommand[], next: CustomCommand) => {
		const clone = prev.slice();
		const prevEntry = clone.find((command) => command.id.toLowerCase() === next.id.toLowerCase());

		if (prevEntry !== undefined) {
			clone[clone.indexOf(prevEntry)] = next;
			return clone;
		}

		return [...clone, next];
	};

	const formikConfig: FormikConfig<CustomCommands.Form> = {
		initialValues: {
			id: '',
			content: '',
			color: '#1E88E5',
			embed: false
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: ({ id, content, color, embed }, { setSubmitting, resetForm }) => {
			setSubmitting(true);

			setGuildSettingsChanges({
				customCommands: mergeCustomCommands(guildSettings.customCommands, {
					id: id.toLowerCase(),
					content,
					color: parse(color || '#1E88E5').B10.value,
					embed,
					aliases: []
				})
			});

			resetForm();
			setSubmitting(false);
		}
	};

	const sortCommands = (firstCommand: CustomCommand, secondCommand: CustomCommand) =>
		firstCommand.id.toLowerCase() < secondCommand.id.toLowerCase() ? -1 : firstCommand.id.toLowerCase() > secondCommand.id.toLowerCase() ? 1 : 0;

	const sortedCommands = guildSettings.customCommands.sort(sortCommands);

	const VirtuosoComponents = useMemo<Components>(
		() => ({
			List: forwardRef(({ style, children }, listRef) => (
				<List style={{ ...style, width: '100%' }} ref={listRef as AnyRef} component="nav">
					{children}
				</List>
			)),

			Item: ({ children, ...props }) => (
				<ListItem {...props} button style={{ margin: 0 }}>
					{children}
				</ListItem>
			)
		}),
		[]
	);

	return (
		<Fragment>
			<Section title="Add Command">
				<SimpleGrid
					direction="row"
					justifyContent="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 12,
						lg: 12,
						xl: 12
					}}
				>
					<Formik {...formikConfig}>
						{({ submitForm }) => (
							<>
								<Grid
									spacing={4}
									container
									direction="row"
									justifyContent="space-between"
									alignContent="stretch"
									alignItems="flex-end"
								>
									<Grid item xs={12} sm={12} md={8} lg={8}>
										<FastField
											component={TextField}
											name="id"
											type="text"
											label="Name"
											placeholder="Fill in the name for your custom command here"
											autoComplete="off"
											margin="normal"
											autoFocus
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={4} lg={2}>
										<FastField
											component={ColorPicker}
											name="color"
											type="text"
											label="Color"
											placeholder="Pick a color for the embedded message"
											autoComplete="off"
											autoCorrect="off"
											autoCapitalize="off"
											spellCheck="off"
											margin="normal"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={2}>
										<FastField component={SelectWithLabel} name="embed" color="primary" title="Embed" />
									</Grid>
								</Grid>
								<FastField
									component={TextField}
									name="content"
									type="text"
									label="Content / Response"
									placeholder="Fill in the content for your custom command here"
									autoComplete="on"
									autoCorrect="on"
									autoCapitalize="on"
									spellCheck="on"
									margin="normal"
									rows={3}
									multiline
									classes={{
										root: classes.contentBoxPadding
									}}
									FormHelperTextProps={{
										classes: { error: classes.errorLabelBottom }
									}}
								/>
								<Button fullWidth classes={{ root: classes.button }} onClick={submitForm} color="primary" variant="contained">
									Add
								</Button>
							</>
						)}
					</Formik>
				</SimpleGrid>
			</Section>
			<Section title="Registered Custom Commands" className={classes.bottomSection}>
				<SimpleGrid
					direction="row"
					justifyContent="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 12,
						lg: 12,
						xl: 12
					}}
				>
					{guildSettings.customCommands.length > 0 ? (
						<Virtuoso
							totalCount={sortedCommands.length}
							overscan={3}
							style={{ height: theme.spacing(40), width: '100%' }}
							className={classes.virtualizedList}
							components={VirtuosoComponents}
							itemContent={(index) => (
								<>
									<ListItemText
										disableTypography
										primary={
											<Typography variant="body1" classes={{ root: classes.tagHeader }}>
												{guildSettings.prefix}
												{sortedCommands[index].id.toLowerCase()}
											</Typography>
										}
										secondary={
											<Typography component="div" variant="body2">
												<GfmReactMarkdown source={sortedCommands[index].content} />
											</Typography>
										}
									/>
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											onClick={() =>
												setGuildSettingsChanges({
													customCommands: guildSettings.customCommands.filter(
														(command) => command.id.toLowerCase() !== sortedCommands[index].id.toLowerCase()
													)
												})
											}
											size="large"
										>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</>
							)}
						/>
					) : (
						<Typography>You have no registered custom commands!</Typography>
					)}
				</SimpleGrid>
			</Section>
		</Fragment>
	);
};

export default memo(CustomCommandSettings);
