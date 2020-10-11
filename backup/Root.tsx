import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import AuthenticatedRoute from '../backup/dashboard/node_modules/components/AuthenticatedRoute';
import ErrorBoundary from 'components/ErrorBoundary';
import RedirectRoute from 'components/RedirectRoute';
import theme from 'lib/theme';
import { history, oauthURL, serverURL } from '../backup/dashboard/node_modules/lib/util/constants';
import CommandsPage from 'pages/Commands';
import DashboardRootPage from 'pages/Dashboard/Root';
import HomePage from 'pages/HomePage';
import MusicPage from 'pages/Music/Music';
import NotFoundPage from 'pages/NotFound';
import GuildCallbackPage from 'pages/oauth/GuildCallbackPage';
import OAuthCallbackPage from 'pages/oauth/OAuthCallbackPage';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import { Route, Router, Switch } from '../backup/dashboard/node_modules/react-router-dom';
import React from '../backup/dashboard/node_modules/reactn';
import { ServiceWorkerProvider } from 'ServiceWorkerContext';
import ServiceWorkerUpdater from './ServiceWorkerUpdate';
import { CookieConsentProvider } from '../src/components/presentational/CookieConsent/ContextProvider';
import CookieWarning from '../src/components/presentational/CookieConsent/WarningSnackbar';

export default () => (
	<ErrorBoundary>
		<ServiceWorkerProvider>
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<CookieConsentProvider>
						<ServiceWorkerUpdater />
						<CookieWarning />
						<Router history={history}>
							<Switch>
								<Route exact path="/" component={HomePage} />
								<Route exact path="/index.html" component={HomePage} />
								<Route exact path="/oauth/callback" component={OAuthCallbackPage} />
								<Route exact path="/oauth/guild" component={GuildCallbackPage} />
								<Route exact path="/commands" component={CommandsPage} />
								<Route exact path="/privacy" component={PrivacyPolicy} />
								<AuthenticatedRoute path="/guilds/:guildID/:pageName?" component={DashboardRootPage} />
								<Route exact path="/music/:guildID" component={MusicPage} />
								<RedirectRoute path="/login" redirectUri={oauthURL.toString()} />
								<RedirectRoute path="/join" redirectUri={serverURL} />
								<Route component={NotFoundPage} />
							</Switch>
						</Router>
					</CookieConsentProvider>
				</ThemeProvider>
			</StylesProvider>
		</ServiceWorkerProvider>
	</ErrorBoundary>
);
