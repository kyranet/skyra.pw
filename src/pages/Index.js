import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import { Container, Box, Typography, Divider, useMediaQuery, useTheme, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import theme from 'meta/theme';
import GeneralPage from 'components/GeneralPage';
import GuildCard from 'components/GuildCard';

import ModerationImage from 'assets/images/features/moderation.png';
import WeebImage from 'assets/images/features/weeb.png';
import FunImage from 'assets/images/features/fun.png';
import ToolsImage from 'assets/images/features/tools.png';
import PokemonImage from 'assets/images/features/pokemon.png';
import { POKEMON_TEXT, TOOLS_TEXT, FUN_TEXT, WEEB_TEXT, MODERATION_TEXT } from './IndexTexts';

const sectionStyles = makeStyles(() => ({
	section: {
		minHeight: 'min-content'
	},
	sectionMobile: {
		minHeight: 'min-content'
	},
	image: {
		borderRadius: 4
	}
}));

const SectionContainer = styled(Box)`
	background: ${theme.palette.secondary.main};
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	align-content: center;
	flex-wrap: wrap;
	flex-direction: row;

	&:nth-of-type(odd) {
		flex-direction: row-reverse;
	}

	.MuiDivider-root {
		margin: 10px 0px;
	}

	.text {
		display: flex;
		flex-direction: column;
		width: 47%;
		${theme.breakpoints.down('sm')} {
			width: 100%;
		}
	}

	img {
		max-width: 400px;
		max-height: 400px;
		${theme.breakpoints.down('sm')} {
			margin-top: 20px;
			width: 100%;
		}
	}
`;

const Section = ({ name, image, text }) => {
	const classes = sectionStyles();
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<SectionContainer p={5} className={clsx({ [classes.section]: !isOnMobile, [classes.sectionMobile]: isOnMobile })}>
			<div className="text">
				<Typography variant="h3" component="h1">
					{name}
				</Typography>
				<Divider />
				<Typography>{text}</Typography>
			</div>
			<Hidden smDown>
				<div className="image-container">
					<img alt={name} loading="lazy" src={image.src} width={image.width} height={image.height} className={classes.image} />
				</div>
			</Hidden>
		</SectionContainer>
	);
};

const HomePage = () => {
	const [global] = useGlobal();
	const { authenticated, user } = global;
	return (
		<GeneralPage>
			{authenticated && (
				<Container>
					<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
						{(user.guilds || [])
							.filter(guild => guild.userCanManage)
							.sort(
								(a, b) =>
									Boolean(b.channels) - Boolean(a.channels) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
							)
							.map(guild => (
								<GuildCard guild={guild} />
							))}
					</Box>
				</Container>
			)}

			{[
				{
					name: 'Moderation',
					image: {
						src: ModerationImage,
						width: 400,
						height: 229
					},
					text: MODERATION_TEXT
				},
				{ name: 'Fun', image: { src: FunImage, width: 400, height: 174 }, text: FUN_TEXT },
				{ name: 'Tools', image: { src: ToolsImage, width: 400, height: 392 }, text: TOOLS_TEXT },
				{ name: 'Pokemon', image: { src: PokemonImage, width: 400, height: 364 }, text: POKEMON_TEXT },
				{ name: 'Weeb', image: { src: WeebImage, width: 400, height: 326 }, text: WEEB_TEXT }
			].map(({ name, image, text }) => (
				<Section name={name} image={image} text={text} key={name} />
			))}
		</GeneralPage>
	);
};

export default HomePage;
