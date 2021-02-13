import { createSeoProps, robotBlockingPageProps } from '@config/next-seo.config';
import type { TransformedLoginData } from '@config/types/ApiData';
import { setAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack } from '@contexts/DiscordPackContext';
import GeneralLayout from '@layout/General';
import { BASE_WEB_URL, CLIENT_ID, FetchMethods, LocalStorageKeys } from '@utils/constants';
import { apiFetch, saveState } from '@utils/util';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const OauthCallback: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const mergePack = mergeDiscordPack();
	const writeAuthenticated = setAuthenticated();
	const router = useRouter();

	const finalizeAuthFlow = useCallback(async (code: string | null) => {
		setLoading(true);

		if (!code) {
			setLoading(false);
			return router.push('/oauth/auth-failed');
		}

		try {
			const data = await apiFetch<TransformedLoginData>(`/oauth/callback`, {
				method: FetchMethods.Post,
				body: JSON.stringify({
					code,
					clientId: CLIENT_ID,
					redirectUri: `${BASE_WEB_URL}/oauth/callback`
				})
			});

			saveState(LocalStorageKeys.DiscordPack, data);
			saveState(LocalStorageKeys.LastSync, Date.now());
			writeAuthenticated(true);
			mergePack(data);
			setLoading(false);

			return router.push('/');
		} catch (error) {
			setLoading(false);
			return router.push('/oauth/auth-failed');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		void finalizeAuthFlow(router.query.code);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<NextSeo
				{...createSeoProps({
					title: 'OAUTH Callback',
					additionalMetaTags: [
						{ name: 'robots', content: 'noindex, nofollow' },
						{ name: 'googlebot', content: 'noindex, nofollow' }
					],
					...robotBlockingPageProps
				})}
				noindex
				nofollow
			/>
			<GeneralLayout loading={loading} />
		</>
	);
};

export default OauthCallback;

declare module 'querystring' {
	interface ParsedUrlQuery {
		code: string | null;
	}
}
