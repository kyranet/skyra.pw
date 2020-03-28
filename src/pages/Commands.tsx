import { Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DnsIcon from '@material-ui/icons/Dns';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LockIcon from '@material-ui/icons/Lock';
import GeneralPage from 'components/GeneralPage';
import Tooltip from 'components/Tooltip';
import { apiFetch } from 'meta/util';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1
		},
		card: {
			color: theme.palette.text.secondary,
			minHeight: 120
		},
		title: {
			fontSize: 14
		},
		chip: {
			padding: theme.spacing(0.2),
			marginLeft: theme.spacing(1)
		},
		avatar: {
			backgroundColor: 'transparent !important'
		},
		cardContainer: {
			flex: '1 1 30%',
			minWidth: 300,
			margin: theme.spacing(2),
			[theme.breakpoints.down('xs')]: {
				width: '100%',
				maxWidth: 'none'
			},
			transition: 'width 0.2s ease-in-out'
		},
		categoryName: {
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center'
			}
		},
		rankIcon: {
			transform: 'rotate(-90deg)'
		}
	})
);

interface Command {
	bucket: number;
	category: string;
	cooldown: number;
	description: string;
	guarded: boolean;
	guildOnly: boolean;
	name: string;
	permissionLevel: number;
	requiredPermissions: string[];
	usage: string;
}

export default () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [commands, setCommands] = useState<Command[]>([]);

	const titles: Record<number, string> = {
		4: 'This command can only be run by staff members.',
		5: 'This command can only be run by moderators and administrators.',
		6: 'This command can only be run by administrators.'
	};

	useEffect(() => {
		apiFetch('/commands').then(commands => {
			setCommands(commands);
			setLoading(false);
		});
	}, []);

	const categories = [...new Set(commands.map(command => command.category))];

	return (
		<GeneralPage loading={loading}>
			<Container>
				{!loading && (
					<Box display="flex" flexDirection="column">
						{categories.map((catName, catIndex) => (
							<Box my={3} key={catIndex}>
								<Typography variant="h2" component="h1" className={classes.categoryName}>
									{catName}
								</Typography>
								<Box my={3}>
									<Divider />
								</Box>
								<Box display="flex" flexWrap="wrap" flex="1 1 30%">
									{commands
										.filter(command => command.category === catName)
										.map((cmd, idx) => (
											<Grid item className={classes.cardContainer} key={idx}>
												<Card className={classes.card}>
													<CardContent>
														<Box display="flex" justifyContent="space-between">
															<Typography variant="h5" component="h2">
																s!{cmd.name}
															</Typography>
															<Grid item container justify="flex-end">
																{cmd.permissionLevel > 0 && (
																	<Tooltip title={titles[cmd.permissionLevel]} placement="top">
																		<Chip
																			size="small"
																			label={cmd.permissionLevel}
																			icon={<DoubleArrowIcon />}
																			classes={{
																				root: classes.chip,
																				iconSmall: classes.rankIcon
																			}}
																		/>
																	</Tooltip>
																)}
																{cmd.guildOnly && (
																	<Tooltip title="This command cannot be used in DMs." placement="top">
																		<Chip
																			size="small"
																			icon={<DnsIcon />}
																			classes={{
																				root: classes.chip
																			}}
																		/>
																	</Tooltip>
																)}
																{cmd.guarded && (
																	<Tooltip title="This command cannot be disabled." placement="top">
																		<Chip
																			size="small"
																			icon={<LockIcon />}
																			classes={{
																				root: classes.chip
																			}}
																		/>
																	</Tooltip>
																)}
															</Grid>
														</Box>
														<Typography className={classes.title} color="textSecondary" gutterBottom>
															{cmd.description}
														</Typography>
													</CardContent>
												</Card>
											</Grid>
										))}
								</Box>
							</Box>
						))}
					</Box>
				)}
			</Container>
		</GeneralPage>
	);
};