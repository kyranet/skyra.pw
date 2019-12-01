import React, { useGlobal, Fragment } from 'reactn';
import styled from 'styled-components';
import { Grid, Card, CardHeader, Container, Box, Typography, Divider, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import GuildIcon from 'components/GuildIcon';
import { navigate } from 'meta/util';
import theme from 'meta/theme';
import GeneralPage from 'components/GeneralPage';
import { guildAddURL } from 'meta/constants';

import ModerationImage from 'assets/images/features/moderation.png';
import WeebImage from 'assets/images/features/weeb.png';
import FunImage from 'assets/images/features/fun.png';
import ToolsImage from 'assets/images/features/tools.png';
import PokemonImage from 'assets/images/features/pokemon.png';

const useStyles = makeStyles(theme => ({
	guildCardContainer: {
		flex: '1 1 0%',
		minWidth: 250,
		maxWidth: 250,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			maxWidth: 'none'
		},
		transition: 'width 0.2s ease-in-out'
	},
	guildCard: {
		'background': theme.palette.secondary.main,
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const sectionStyles = makeStyles(() => ({
	section: {
		minHeight: '50vh'
	},
	sectionMobile: {
		minHeight: '60vh'
	},
	image: {
		borderRadius: 4
	}
}));

const SectionContainer = styled(Box)`
	background: ${theme.palette.primary.main};
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	align-content: center;

	flex-direction: row;

	&:nth-of-type(odd) {
		flex-direction: row-reverse;
		background: ${theme.palette.secondary.main};
	}

	flex-wrap: wrap;

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

const Section = ({ name, image }) => {
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
				<Typography>
					Vangelis prime number Jean-François Champollion billions upon billions cosmic ocean Apollonius of Perga. Shores of the
					cosmic ocean inconspicuous motes of rock and gas laws of physics globular star cluster invent the universe corpus
					callosum? Shores of the cosmic ocean vastness is bearable only through love take root and flourish a still more glorious
					dawn awaits take root and flourish vanquish the impossible.
				</Typography>
			</div>
			{isOnMobile ? (
				<Fragment />
			) : (
				<div className="image-container">
					<img alt={name} loading="lazy" src={image.src} width={image.width} height={image.height} className={classes.image} />
				</div>
			)}
		</SectionContainer>
	);
};

const HomePage = () => {
	const [global] = useGlobal();
	const classes = useStyles();
	const { authenticated, user } = global;
	return (
		<GeneralPage>
			{authenticated && (
				<Box p={2} my={2}>
					<Container>
						<Grid container direction="row" justify="center" alignItems="center" spacing={4} className={classes.guildsList}>
							{(user.guilds || [])
								.filter(guild => guild.userCanManage)
								.sort((a, b) => Boolean(b.channels) - Boolean(a.channels))
								.map(guild => (
									<Grid item className={classes.guildCardContainer} key={guild.id}>
										<Card
											elevation={2}
											onClick={navigate(Boolean(guild.channels) ? `/guilds/${guild.id}` : guildAddURL(guild.id))}
											className={classes.guildCard}
										>
											<CardHeader
												subheader={!guild.channels && 'Click to invite Skyra'}
												avatar={<GuildIcon guild={guild} />}
												title={guild.name}
											/>
										</Card>
									</Grid>
								))}
						</Grid>
					</Container>
				</Box>
			)}

			{[
				{
					name: 'Moderation',
					image: {
						src: ModerationImage,
						width: 400,
						height: 229
					}
				},
				{ name: 'Fun', image: { src: FunImage, width: 400, height: 174 } },
				{ name: 'Tools', image: { src: ToolsImage, width: 400, height: 392 } },
				{ name: 'Pokemon', image: { src: PokemonImage, width: 400, height: 364 } },
				{ name: 'Weeb', image: { src: WeebImage, width: 400, height: 326 } }
			].map(({ name, image }) => (
				<Section name={name} image={image} key={name} />
			))}
		</GeneralPage>
	);
};

export default HomePage;
