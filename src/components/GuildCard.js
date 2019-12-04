import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader } from '@material-ui/core';

import GuildIcon from 'components/GuildIcon';
import { navigate } from 'meta/util';
import { guildAddURL } from 'meta/constants';
import theme from 'meta/theme';

const StyledCard = styled(Card)`
	min-width: 250px;
	background: ${theme.palette.secondary.light};
	max-width: 250px;
	margin: ${theme.spacing(2)}px;

	&:hover {
		cursor: pointer;
	}

	${theme.breakpoints.down('xs')} {
		width: 100%;
		max-width: none;
	}
`;

const GuildCard = ({ guild }) => (
	<StyledCard elevation={2} onClick={navigate(Boolean(guild.channels) ? `/guilds/${guild.id}` : guildAddURL(guild.id))}>
		<CardHeader subheader={!guild.channels && 'Click to invite Skyra'} avatar={<GuildIcon guild={guild} />} title={guild.name} />
	</StyledCard>
);

export default GuildCard;
