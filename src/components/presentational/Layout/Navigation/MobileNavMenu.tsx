import { setAuthenticated, useAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack, useDiscordPack } from '@contexts/DiscordPackContext';
import LazyAvatar from '@material/LazyAvatar';
import InviteIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Eject';
import CommandsIcon from '@mui/icons-material/Extension';
import DiscordChatIcon from '@mui/icons-material/Forum';
import GavelIcon from '@mui/icons-material/Gavel';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SyncIcon from '@mui/icons-material/Sync';
import LoginIcon from '@mui/icons-material/VpnKey';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import MenuItemLink from '@routing/MenuItemLink';
import { oauthURL } from '@utils/constants';
import { displayAvatarURL } from '@utils/skyraUtils';
import { clearData, logOut, syncUser } from '@utils/util';
import { useRouter } from 'next/router';
import React, { FC, memo, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';

const useStyles = makeStyles((theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2)
		},
		popper: {
			marginTop: theme.spacing(1),
			zIndex: theme.zIndex.drawer + 1
		},
		button: {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0
		},
		transparentButton: {
			background: 'transparent',
			boxShadow: 'none',
			'&:hover': {
				background: theme.palette.primary.dark,
				boxShadow: theme.shadows[1]
			}
		},
		syncLogo: {
			'&:hover': {
				animation: `$syncLogoSpin 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1)`
			}
		},
		'@keyframes syncLogoSpin': {
			'0%': {
				transform: 'rotate(0deg)'
			},
			'100%': {
				transform: 'rotate(-360deg)'
			}
		}
	})
);

const MobileNavMenu: FC = () => {
	const classes = useStyles();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [popperMenuIsOpen, setPopperMenuOpen] = useState(false);

	const authenticated = useAuthenticated();
	const pack = useDiscordPack();
	const writeAuthenticated = setAuthenticated();
	const setPack = mergeDiscordPack();

	const router = useRouter();

	const togglePopperMenu = () => {
		setPopperMenuOpen((prevOpen) => !prevOpen);
	};

	const closePopperMenu = (event: MouseEvent | TouchEvent | ReactMouseEvent<HTMLAnchorElement | HTMLLIElement, MouseEvent>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setPopperMenuOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setPopperMenuOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const popperMenuPrevOpen = useRef(popperMenuIsOpen);

	useEffect(() => {
		if (popperMenuPrevOpen.current && !popperMenuIsOpen) {
			anchorRef.current?.focus();
		}

		popperMenuPrevOpen.current = popperMenuIsOpen;
	}, [popperMenuIsOpen]);

	return (
		<>
			<IconButton
				ref={anchorRef}
				edge="start"
				aria-controls={popperMenuIsOpen ? 'menu-popover' : undefined}
				aria-haspopup="true"
				className={classes.menuButton}
				color="inherit"
				aria-label="menu"
				onClick={togglePopperMenu}
				size="large"
			>
				<If condition={authenticated}>
					<Then>
						<LazyAvatar src={displayAvatarURL(pack?.user, { size: 32 })} imgProps={{ height: 32, width: 32 }} alt="U" />
					</Then>
					<Else>
						<MenuIcon />
					</Else>
				</If>
			</IconButton>
			<Popper className={classes.popper} open={popperMenuIsOpen} anchorEl={anchorRef.current} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={closePopperMenu}>
								<MenuList autoFocusItem={popperMenuIsOpen} id="menu-popover" onKeyDown={handleListKeyDown}>
									<If condition={authenticated}>
										<Then>
											<MenuItem
												component="a"
												onClick={async (...args: Parameters<typeof closePopperMenu>) => {
													closePopperMenu(...args);
													await logOut();
													clearData(setPack, writeAuthenticated, router.push);
												}}
											>
												<ListItemIcon>
													<LogoutIcon />
												</ListItemIcon>
												<Typography variant="inherit">Logout</Typography>
											</MenuItem>
											<MenuItem
												onClick={(...args: Parameters<typeof closePopperMenu>) => {
													closePopperMenu(...args);
													syncUser(authenticated, setPack, writeAuthenticated, router.push);
												}}
											>
												<ListItemIcon>
													<SyncIcon className={classes.syncLogo} />
												</ListItemIcon>
												<Typography variant="inherit">Resync user data</Typography>
											</MenuItem>
										</Then>
										<Else>
											<MenuItemLink href={oauthURL.toString()} Icon={<LoginIcon />} text="Login" forceSameTab />
										</Else>
									</If>
									{router.pathname !== '/' && <MenuItemLink href="/" Icon={<HomeIcon />} text="Go back home" />}
									<MenuItemLink href="/commands" Icon={<CommandsIcon />} text="Commands" />
									<MenuItemLink href="/privacy" Icon={<GavelIcon />} text="Privacy Policy" />
									<MenuItemLink href="https://invite.skyra.pw" Icon={<InviteIcon />} text="Add Skyra to server" />
									<MenuItemLink href="https://join.skyra.pw" Icon={<DiscordChatIcon />} text="Join our Discord" />
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

export default memo(MobileNavMenu);
