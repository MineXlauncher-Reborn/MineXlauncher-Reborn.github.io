// @ts-nocheck

const cacheName = `minexlauncher-full`;

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then(async (cache) => {
			const response = await fetch('/resources/data/assets.json');
			const cacheAssets = await response.json();
			const totalAssets = cacheAssets.length;
			let cachedAssets = 0;

			for (const asset of cacheAssets) {
				await cache.add(asset);
				const progress = `${++cachedAssets}/${totalAssets}`;

				console.log(`Cached: ${asset} (${progress})`);
			}
		}),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keyList) => {
				return Promise.all(
					keyList.map((key) => {
						if (key !== cacheName) {
							return caches.delete(key);
						} else {
							return null;
						}
					}),
				);
			})
			.then(() => {
				return self.clients.claim();
			})
			.then(() => {
				return self.clients.matchAll().then((clients) => {
					clients.forEach((client) => {
						client.postMessage({
							title: 'sw-install-complete',
						});
					});
				});
			}),
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response ?? fetch(event.request);
		}),
	);
});
