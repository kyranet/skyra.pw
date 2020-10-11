import Box from '@material-ui/core/Box';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { FC } from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
			alignContent: 'center',
			padding: 10,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 10,
			marginRight: 10
		},
		svg: {
			marginRight: 10
		}
	})
);

const SearchBar: FC<InputBaseProps> = ({ onChange }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<SearchIcon className={classes.svg} />
			<InputBase
				autoFocus
				autoCapitalize="false"
				autoComplete="off"
				autoCorrect="false"
				results={4}
				placeholder="Search…"
				onChange={onChange}
				inputProps={{ 'aria-label': 'search input' }}
			/>
		</Box>
	);
};

export default SearchBar;
