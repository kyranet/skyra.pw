import { FlattenedCommand } from '@config/types/ApiData';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BrushIcon from '@material-ui/icons/BrushTwoTone';
import CodeIcon from '@material-ui/icons/CodeTwoTone';
import CreateIcon from '@material-ui/icons/CreateTwoTone';
import ExamplesIcon from '@material-ui/icons/EmojiObjects';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chips from '@presentational/CommandsPage/Chips';
import { reactStringReplace } from '@utils/reactStringReplace';
import ReminderIcon from 'mdi-react/BellAlertIcon';
import HelpRhombusIcon from 'mdi-react/HelpRhombusIcon';
import React, { FC, memo } from 'react';
import ExtendedHelpBody from './ExtendedHelpBody';
import ExtendedHelpSectionHeader from './ExtendedHelpSectionHeader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		commandContainer: {
			flex: '1 1 30%',
			minWidth: '100%',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			transition: 'width 0.2s ease-in-out',
			[theme.breakpoints.down('xs')]: {
				maxWidth: 'none',
				marginLeft: 0,
				marginRight: 0
			}
		},
		commandAccordion: {
			backgroundColor: theme.palette.secondary.light
		},
		commandHeading: {
			fontSize: theme.typography.pxToRem(20),
			fontWeight: theme.typography.fontWeightRegular
		},
		commandSubHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary
		},
		extendedHelpGrid: {
			marginTop: theme.spacing(4)
		}
	})
);

interface CommandProps {
	command: FlattenedCommand;
}

const resolveMultilineString = (str: string | string[], multiline: boolean): string => {
	return Array.isArray(str)
		? resolveMultilineString(str.join(multiline ? '\n' : ' '), multiline)
		: str
				.split('\n')
				.map(line => line.trim())
				.join(multiline ? '\n\n' : ' ');
};

const Command: FC<CommandProps> = ({ command }) => {
	const classes = useStyles();

	return (
		<Grid item className={classes.commandContainer}>
			<Accordion defaultExpanded TransitionProps={{ unmountOnExit: true }} elevation={4} classes={{ root: classes.commandAccordion }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Grid container direction="row" alignItems="center" justify="flex-start" alignContent="flex-start">
						<Grid item xs={12} md={3}>
							<Typography className={classes.commandHeading}>
								{reactStringReplace(`s!${command.name}`, /(.{10})/g, (match, index) => (
									<span key={index}>
										<wbr />
										{match}
									</span>
								))}
							</Typography>
						</Grid>
						<Grid item xs={12} md={9}>
							<Typography component="span" className={classes.commandSubHeading}>
								<ExtendedHelpBody body={command.description} />
							</Typography>
						</Grid>
					</Grid>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container direction="column">
						<Grid item>
							<ExtendedHelpSectionHeader icon={<CreateIcon />} header="Command Usage" />
						</Grid>
						<Grid item>
							<ExtendedHelpBody body={`\`s!${command.usage}\``} />
						</Grid>

						{command.extendedHelp.extendedHelp && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<HelpRhombusIcon />} header="Extended Help" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={resolveMultilineString(
											command.extendedHelp.extendedHelp,
											command.extendedHelp.multiline ?? false
										)}
									/>
								</Grid>
							</>
						)}

						{command.extendedHelp.explainedUsage && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<CodeIcon />} header="Explained Usage" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={command.extendedHelp.explainedUsage
											.map(([arg, desc]) => `- **${arg}**: ${desc}\n`)
											.join('\n')}
									/>
								</Grid>
							</>
						)}

						{command.extendedHelp.possibleFormats && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<BrushIcon />} header="Possible Formats" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={command.extendedHelp.possibleFormats
											.map(([type, example]) => `- **${type}**: ${example}\n`)
											.join('\n')}
									/>
								</Grid>
							</>
						)}

						{command.extendedHelp.examples && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<ExamplesIcon />} header="Examples" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={command.extendedHelp.examples
											.map(example => `- Skyra, ${command.name}${example ? ` *${example}*` : ''}\n`)
											.join('\n')}
									/>
								</Grid>
							</>
						)}

						{command.extendedHelp.reminder && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<ReminderIcon />} header="Reminder" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={resolveMultilineString(
											command.extendedHelp.reminder,
											command.extendedHelp.multiline ?? false
										)}
									/>
								</Grid>
							</>
						)}
					</Grid>
				</AccordionDetails>
				<AccordionActions>
					<Chips command={command} />
				</AccordionActions>
			</Accordion>
		</Grid>
	);
};

export default memo(Command);
