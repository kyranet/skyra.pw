import features from '@assets/features';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useDiscordPack } from '@contexts/DiscordPackContext';
import GeneralPage from '@layout/General';
import { Box, Container } from '@mui/material';
import { FilteredGuildCards } from '@presentational/GuildCard';
import HomePageSection from '@presentational/HomePageSection';
import React, { FC } from 'react';

const HomePage: FC = () => {
	const authenticated = useAuthenticated();
	const pack = useDiscordPack();

	return (
		<GeneralPage>
			{authenticated && (
				<Container>
					<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
						{FilteredGuildCards(pack)}
					</Box>
				</Container>
			)}
			{features.map(({ name, text }) => (
				<HomePageSection name={name} text={text} key={name} />
			))}
		</GeneralPage>
	);
};

export default HomePage;
