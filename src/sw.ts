import { precacheAndRoute, createHandlerBoundToURL, cleanupOutdatedCaches } from 'workbox-precaching';
import { setCacheNameDetails } from 'workbox-core';
import { setDefaultHandler, registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

setCacheNameDetails({
	prefix: 'skyra',
	suffix: 'v1',
	precache: 'precache',
	runtime: 'runtime'
});

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

const defaultStrategy = new StaleWhileRevalidate({
	cacheName: 'skyra-external-v1',
	plugins: [
		new ExpirationPlugin({
			maxEntries: 50,
			maxAgeSeconds: 60 * 60 * 24,
			purgeOnQuotaError: true
		}),
		new CacheableResponsePlugin({
			statuses: [0, 200]
		})
	]
});

setDefaultHandler((args) => {
	if (args.request.method === 'GET') {
		return defaultStrategy.handle(args);
	}
	return fetch(args.request);
});

registerRoute(
	/^.*\\.(png|jpg|jpeg|gif|svg|pdf|ico)/i,
	new CacheFirst({
		cacheName: 'skyra-media-v1',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 60 * 60 * 24,
				purgeOnQuotaError: true
			})
		]
	})
);

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
	void self.skipWaiting();
});

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		void self.skipWaiting();
	}
});
