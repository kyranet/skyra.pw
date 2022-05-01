import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@routing/Link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { forwardRef, ReactElement } from 'react';
import { When } from 'react-if';

interface ListItemLinkProps {
	href: string;
	itemText: string;
	listItemDisabled: boolean;
	listItemDense?: boolean;
	listItemClassName?: string;
	Icon?: ReactElement;
	listItemOnClick(): void;
}

const useStyles = makeStyles(() =>
	createStyles({
		menuLink: {
			color: 'inherit',
			'&:hover': {
				color: 'inherit'
			},
			'&:visited': {
				color: 'inherit'
			}
		},
		menuLinkHighlight: {
			backgroundColor: 'rgba(150, 150, 150, 0.3)'
		}
	})
);

const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
	({ href, itemText, listItemDense = false, listItemDisabled = false, listItemOnClick, listItemClassName, Icon }, ref) => {
		const classes = useStyles();
		const router = useRouter();

		return (
			<Link href={href} className={classes.menuLink} ref={ref}>
				<ListItem
					button
					dense={listItemDense}
					disabled={listItemDisabled}
					onClick={listItemOnClick}
					className={clsx(listItemClassName, classes.menuLink, { [classes.menuLinkHighlight]: href === router.asPath })}
				>
					<When condition={Boolean(Icon)}>
						<ListItemIcon>{Icon}</ListItemIcon>
					</When>
					<ListItemText primary={itemText} />
				</ListItem>
			</Link>
		);
	}
);

export default ListItemLink;
