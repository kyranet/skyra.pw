import React, { Fragment, useState, useEffect } from 'reactn';
import { Link, Switch } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import styled from 'styled-components';
import {
	Toolbar,
	ListItem,
	ListItemIcon,
	ListItemText,
	List,
	IconButton,
	Hidden,
	Drawer,
	Divider,
	AppBar,
	Typography,
	Button,
	Collapse,
	Slide,
	Box,
	Fade,
	useMediaQuery
} from '@material-ui/core';
import { createStyles, useTheme, makeStyles } from '@material-ui/styles';
import deepMerge from 'deepmerge';
import Skeleton from '@material-ui/lab/Skeleton';
import Settings from '@material-ui/icons/Settings';
import Subject from '@material-ui/icons/Subject';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Gavel from '@material-ui/icons/Gavel';
import StarIcon from '@material-ui/icons/Star';
import FilterListIcon from '@material-ui/icons/FilterList';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import MusicIcon from '@material-ui/icons/MusicNote';

import AuthenticatedRoute from 'components/AuthenticatedRoute';
import UserMenu from 'components/UserMenu';
import GuildIcon from 'components/GuildIcon';
import SettingsPage from 'pages/Dashboard/SettingsPage';
import StarboardPage from 'pages/Dashboard/Starboard';
import LogsPage from 'pages/Dashboard/LogsPage';
import CustomCommandsPage from 'pages/Dashboard/CustomCommands';
import ModerationIndexPage from 'pages/Dashboard/Moderation/Index';
import FilterWordsPage from 'pages/Dashboard/Filter/Words';
import FilterCapitalsPage from 'pages/Dashboard/Filter/Capitals';
import FilterLinksPage from 'pages/Dashboard/Filter/Links';
import { authedFetch, navigate, noOp } from 'meta/util';
import SkyraLogo from 'assets/skyraLogo';
import InvitesFilterPage from './Filter/Invites';
import MessagesFilterPage from './Filter/Messages';
import NewLinesFilterPage from './Filter/NewLines';
import ReactionsFilterPage from './Filter/Reactions';

// Overwrite arrays when merging
const mergeOptions = {
	arrayMerge: (destinationArray, sourceArray) => sourceArray
};

const drawerWidth = 240;

const ServerHeader = styled.div`
	padding: 14px 20px;

	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;

	min-height: 100px;

	.MuiAvatar-root {
		width: 60px;
		height: 60px;
	}
`;

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			display: 'flex',
			height: '100vh'
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0
			}
		},
		appBar: {
			marginLeft: drawerWidth,
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`
			}
		},
		breadcrumb: {
			color: theme.palette.primary.contrastText
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none'
			}
		},
		toolbar: {
			...theme.mixins.toolbar,
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText
		},
		guildImage: {
			...theme.mixins.toolbar,
			padding: `0px ${theme.spacing(3)}px`,
			background: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			'&:hover': {
				cursor: 'pointer'
			}
		},
		drawerPaper: {
			width: drawerWidth,
			background: theme.palette.secondary.main,
			color: theme.palette.primary.contrastText
		},
		content: {
			flexGrow: 1,
			background: theme.palette.secondary.dark,
			color: theme.palette.secondary.contrastText,
			display: 'flex',
			padding: theme.spacing(4),
			marginTop: 64,
			flexDirection: 'column',
			overflowY: 'scroll',
			[theme.breakpoints.down('sm')]: {
				marginTop: 56
			}
		},
		card: {
			background: theme.palette.secondary.main
		},
		fabContainer: {
			position: 'fixed',
			bottom: 30,
			right: 30,
			'& button': {
				marginLeft: 30
			}
		},
		saveIcon: {
			marginRight: theme.spacing(2)
		},
		nested: {
			paddingLeft: theme.spacing(4)
		}
	})
);

const RootComponent = props => {
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles(props);
	const [state, setState] = useState({
		mobileOpen: false,
		guildData: null,
		guildSettings: {},
		guildSettingsChanges: {},
		isUpdating: false,
		/* Which nested list menus in the sidebar are open */
		openSubMenus: []
	});

	const syncGuildData = async () => {
		const { guildID } = props.match.params;
		let error;

		const [guildData, guildSettings] = await Promise.all([
			authedFetch(`/guilds/${guildID}`),
			authedFetch(`/guilds/${guildID}/settings`)
		]).catch(() => {
			error = true;
			return [null, null];
		});
		if (error) return navigate('/404')();

		setState({ ...state, guildData, guildSettings });
	};

	useEffect(() => {
		syncGuildData();
	}, []); // eslint-disable-line

	const submitChanges = async () => {
		setState({ ...state, isUpdating: true });

		const { guildID } = props.match.params;
		const response = await authedFetch(`/guilds/${guildID}/settings`, {
			method: 'POST',
			body: {
				guild_id: guildID,
				data: state.guildSettingsChanges
			}
		}).catch(err => {
			// TODO toast
			console.error(err);
		});

		if (!response || !response.newSettings || response.error) {
			// TODO toast
			return;
		}

		setState({
			...state,
			guildSettingsChanges: {},
			guildSettings: response.newSettings,
			isUpdating: false
		});
	};

	const patchGuildData = changes => {
		setState({ ...state, guildSettingsChanges: deepMerge(state.guildSettingsChanges, changes, mergeOptions) });
	};

	const toggleSidebar = () => setState({ ...state, mobileOpen: !state.mobileOpen });
	const closeSidebarOnMobile = () => (isOnMobile ? toggleSidebar() : noOp());

	const handleSubMenu = menuName => {
		const { openSubMenus } = state;
		if (openSubMenus.includes(menuName)) {
			setState({ ...state, openSubMenus: openSubMenus.filter(item => item !== menuName) });
		} else {
			setState({ ...state, openSubMenus: [...openSubMenus, menuName] });
		}
	};

	const { container } = props;
	// The guildID and optional pageName in the URL. e.g. /guilds/228822415189344257/settings
	const { guildID } = props.match.params;
	const { mobileOpen, guildData, guildSettings, guildSettingsChanges, isUpdating, openSubMenus } = state;

	const componentProps = {
		guildSettings: deepMerge(guildSettings || {}, guildSettingsChanges || {}, mergeOptions),
		guildData,
		guildID,
		patchGuildData
	};

	const drawer = (
		<Fragment>
			<div onClick={navigate(`/`)} className={classes.guildImage}>
				<SkyraLogo />
				<Typography variant="h5">Skyra</Typography>
			</div>
			<Divider />

			{/* --------------------- */}
			<ServerHeader>
				<If condition={guildData !== null}>
					<Then>
						<Fragment>
							<GuildIcon guild={guildData} size={256} />
							<Typography variant="subtitle2" style={{ marginTop: 15 }}>
								{guildData?.name}
							</Typography>
						</Fragment>
					</Then>
					<Else>
						<Fragment>
							<Skeleton variant="circle" width={60} height={60} />
							<Skeleton variant="text" width={100} height={14} />
						</Fragment>
					</Else>
				</If>
			</ServerHeader>
			{/* --------------------- */}

			<div role="presentation" onKeyDown={isOnMobile ? toggleSidebar : noOp}>
				<List style={{ overflowY: 'auto' }}>
					<ListItem onClick={closeSidebarOnMobile} disabled={!guildData} component={Link} to={`/guilds/${guildID}`} button>
						<ListItemIcon>
							<Settings />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItem>

					{/* ------------------------------- */}
					<ListItem disabled={!guildData} button onClick={() => handleSubMenu('moderation')}>
						<ListItemIcon>
							<Gavel />
						</ListItemIcon>
						<ListItemText primary="Moderation" />
						{openSubMenus.includes('moderation') ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openSubMenus.includes('moderation')} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/moderation/settings`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Moderation Settings" />
							</ListItem>
						</List>
					</Collapse>

					{/* ------------------------------- */}
					<ListItem disabled={!guildData} button onClick={() => handleSubMenu('filter')}>
						<ListItemIcon>
							<FilterListIcon />
						</ListItemIcon>
						<ListItemText primary="Filter" />
						{openSubMenus.includes('filter') ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openSubMenus.includes('filter')} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Words" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/capitals`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Capitals" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/invites`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Invites" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/links`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Links" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/messages`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Message Duplication" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/newlines`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Line Spam" />
							</ListItem>
							<ListItem
								onClick={closeSidebarOnMobile}
								disabled={!guildData}
								dense
								component={Link}
								to={`/guilds/${guildID}/filter/reactions`}
								button
								className={classes.nested}
							>
								<ListItemText primary="Reactions" />
							</ListItem>
						</List>
					</Collapse>

					{/* ------------------------------- */}

					<ListItem onClick={closeSidebarOnMobile} disabled={!guildData} component={Link} to={`/guilds/${guildID}/logs`} button>
						<ListItemIcon>
							<Subject />
						</ListItemIcon>
						<ListItemText primary="Message Logs" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData}
						component={Link}
						to={`/guilds/${guildID}/custom-commands`}
						button
					>
						<ListItemIcon>
							<SpeakerNotesIcon />
						</ListItemIcon>
						<ListItemText primary="Custom Commands" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem
						onClick={closeSidebarOnMobile}
						disabled={!guildData}
						component={Link}
						to={`/guilds/${guildID}/starboard`}
						button
					>
						<ListItemIcon>
							<StarIcon />
						</ListItemIcon>
						<ListItemText primary="Starboard" />
					</ListItem>

					{/* ------------------------------- */}

					<ListItem onClick={closeSidebarOnMobile} component={Link} to={`/music/${guildID}`} button>
						<ListItemIcon>
							<MusicIcon />
						</ListItemIcon>
						<ListItemText primary="Music" />
					</ListItem>
				</List>
			</div>
		</Fragment>
	);

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton color="primary" edge="start" onClick={toggleSidebar} className={classes.menuButton}>
						<MenuIcon color="secondary" />
					</IconButton>

					<Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
						{guildData ? (
							<Typography component="h1">{guildData.name}</Typography>
						) : (
							<Skeleton type="text" width={200} height={16} />
						)}
						<UserMenu />
					</Box>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}>
				<Hidden smUp>
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={toggleSidebar}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown>
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				{guildData ? (
					<Fade in={Boolean(guildData)}>
						<div>
							<Switch>
								<AuthenticatedRoute
									exact
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/starboard"
									component={StarboardPage}
								/>
								<AuthenticatedRoute
									exact
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/filter"
									component={FilterWordsPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/filter/capitals"
									component={FilterCapitalsPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/filter/invites"
									component={InvitesFilterPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/filter/links"
									component={FilterLinksPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/filter/messages"
									component={MessagesFilterPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/filter/newlines"
									component={NewLinesFilterPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/filter/reactions"
									component={ReactionsFilterPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/moderation"
									component={ModerationIndexPage}
								/>

								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/logs"
									component={LogsPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID/custom-commands"
									component={CustomCommandsPage}
								/>
								<AuthenticatedRoute
									componentProps={{ ...componentProps }}
									path="/guilds/:guildID"
									component={SettingsPage}
								/>
							</Switch>
						</div>
					</Fade>
				) : null}
				<Slide direction="up" in={Object.keys(guildSettingsChanges).length > 0} mountOnEnter unmountOnExit>
					<div className={classes.fabContainer}>
						<Button
							disabled={isUpdating}
							onClick={() => setState({ ...state, guildSettingsChanges: {} })}
							color="secondary"
							variant="contained"
							size="small"
						>
							<DeleteIcon className={classes.saveIcon} />
							Reset
						</Button>
						<Button disabled={isUpdating} onClick={submitChanges} color="primary" variant="contained">
							<SaveIcon className={classes.saveIcon} />
							Save Changes
						</Button>
					</div>
				</Slide>
			</main>
		</div>
	);
};

export default RootComponent;
