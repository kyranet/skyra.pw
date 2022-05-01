import MuiListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { forwardRef } from 'react';
import type { NormalComponents } from 'react-markdown/src/ast-to-react';

const ListItem = forwardRef<HTMLLIElement, Parameters<Exclude<NormalComponents['ul'], 'ul'>>[0]>(({ children }, ref) => {
	return (
		<MuiListItem ref={ref} dense divider disableGutters alignItems="flex-start">
			<ListItemText disableTypography>{children}</ListItemText>
		</MuiListItem>
	);
});

export default ListItem;
