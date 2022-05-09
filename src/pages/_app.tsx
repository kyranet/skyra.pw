import '@config/globals.css';
import DefaultSeoProps from '@config/SEO/DefaultSeoProps';
import theme from '@config/theme';
import { MobileContextProvider } from '@contexts/MobileContext';
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, StyledEngineProvider, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalStorageKeys } from '@utils/constants';
import createEmotionCache from '@utils/createEmotionCache';
import { clearState } from '@utils/util';
import type { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import React, { useEffect } from 'react';

const DiscordPackProvider = dynamic(() => import('@contexts/DiscordPackContext'));
const AuthenticatedProvider = dynamic(() => import('@contexts/AuthenticationContext'));

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface SkyraAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const App: NextPage<SkyraAppProps> = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
	useEffect(() => {
		window.$discordMessage = {
			avatars: {
				default: 'blue',
				favna: '/avatars/favna.gif',
				skyra: '/avatars/skyra.png'
			},
			profiles: {
				skyra: {
					author: 'Skyra',
					avatar: '/avatars/skyra.png',
					bot: true,
					verified: true,
					roleColor: '#1E88E5'
				},
				favna: {
					author: 'Favna',
					avatar: '/avatars/favna.gif',
					roleColor: '#FF0000'
				},
				kyra: {
					author: 'Kyra',
					avatar: '/avatars/kyra.gif',
					roleColor: '#FF9D01'
				}
			}
		};

		if (process.env.NODE_ENV === 'production') {
			console.log(
				'%cHold Up!',
				`color: ${theme.palette.primary.main}; font-size: 72px; font-weight: bold; -webkit-text-stroke: 2px ${theme.palette.common.black}`
			);
			console.log(
				[
					'%cIf someone told you to copy/paste something here,',
					'it is likely that you are being tricked and/or scammed.',
					'For more information check out\n\nhttps://en.wikipedia.org/wiki/Self-XSS'
				].join(' '),
				'font-size: 16px;'
			);
			console.log(
				[
					'%cWhile we do everything in our power to ensure your security,',
					'pasting anything in here could give attackers access to your private information!'
				].join(' '),
				'font-size: 18px; font-weight: bold; color: red;'
			);
			console.log(
				'%cIf you do understand exactly what you are doing, you should join the Skyra Project team https://join.skyra.pw',
				'font-size: 16px;'
			);
		}

		// Clear the old cookie consent local storage key
		clearState(LocalStorageKeys.HasCookieConsent);
	}, []);

	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta httpEquiv="Expires" content="1y" />
				<meta httpEquiv="Pragma" content="1y" />
				<meta httpEquiv="Cache-Control" content="1y" />

				<meta httpEquiv="Page-Enter" content="RevealTrans(Duration=2.0,Transition=2)" />
				<meta httpEquiv="Page-Exit" content="RevealTrans(Duration=3.0,Transition=12)" />

				<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
				<link rel="icon" type="image/png" sizes="194x194" href="/icons/android-chrome-194x194.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color={theme.palette.primary.main} />
				<link rel="shortcut icon" href="/icons/favicon.ico" />
				<link rel="apple-touch-startup-image" href="/icons/apple-startup.png" />
			</Head>
			<DefaultSeo {...DefaultSeoProps} />

			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<MobileContextProvider value={{ isMobile }}>
						<AuthenticatedProvider>
							<DiscordPackProvider>
								<CssBaseline />
								<Component {...pageProps} />
								<NextNprogress color="#0A5699" startPosition={0.3} stopDelayMs={200} height={3} />
							</DiscordPackProvider>
						</AuthenticatedProvider>
					</MobileContextProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</CacheProvider>
	);
};

export default App;
