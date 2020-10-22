import features from '@assets/features';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useDiscordPack } from '@contexts/DiscordPackContext';
import { Box, Container } from '@material-ui/core';
import FilteredGuildCards from '@presentational/GuildCard';
import HomePageSection from '@presentational/HomePageSection';
import GeneralPage from '@presentational/Layout/General';
import ScrollToTop from '@routing/ScrollToTop';
import React, { FC } from 'react';

const HomePage: FC = () => {
	const authenticated = useAuthenticated();
	const pack = useDiscordPack();

	return (
		<>
			<ScrollToTop />
			<GeneralPage>
				{authenticated && (
					<Container>
						<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
							{FilteredGuildCards(pack)}
						</Box>
					</Container>
				)}
				{features.map(({ name, previewContent, text }) => (
					<HomePageSection name={name} text={text} previewContent={previewContent} key={name} />
				))}
			</GeneralPage>
		</>
	);
};

export default HomePage;
