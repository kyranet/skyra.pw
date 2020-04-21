import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button, { ButtonProps as MButtonProps } from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from 'components/DialogTitle';
import SearchBar from 'components/SearchBar';
import Tooltip from 'components/Tooltip';
import { toTitleCase } from 'meta/util';
import React, { ChangeEvent, Fragment, ReactNode, useState } from 'react';
import { Else, If, Then } from 'react-if';

export interface SelectOneProps {
	label: string;
	name: ReactNode;
	values: {
		name: string;
		value: string;
	}[];
	tooltipTitle?: string;
	buttonProps?: MButtonProps;

	onChange(...args: any[]): void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialogContent: {
			padding: theme.spacing(2)
		},
		dialogActions: {
			margin: 0,
			padding: theme.spacing(1)
		}
	})
);

export default function SelectOne({ label, onChange, values, name = 'None', tooltipTitle, buttonProps }: SelectOneProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const classes = useStyles();

	const handleClose = () => setOpen(!open);

	return (
		<Fragment>
			<If condition={Boolean(tooltipTitle)}>
				<Then>
					<Tooltip
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						title={tooltipTitle!}
						placement="top"
					>
						<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
							{label}: {name}
						</Button>
					</Tooltip>
				</Then>
				<Else>
					<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
						{label}: {name}
					</Button>
				</Else>
			</If>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{toTitleCase(label)}</DialogTitle>
				{values.length > 10 && <SearchBar onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />}
				<DialogContent dividers classes={{ root: classes.dialogContent }}>
					<List component="nav">
						{values
							.filter(({ name, value }) => {
								if (!search) return true;
								return `${name} ${value}`.toLowerCase().includes(search);
							})
							.map(({ name, value }) => (
								<ListItem
									key={value}
									button
									onClick={() => {
										onChange(value);
										handleClose();
									}}
								>
									<ListItemText primary={name} />
								</ListItem>
							))}
					</List>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActions }}>
					<Button
						onClick={() => {
							onChange(null);
							handleClose();
						}}
						color="primary"
					>
						Reset
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
