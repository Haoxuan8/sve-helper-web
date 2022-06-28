import {precacheAndRoute} from "workbox-precaching";
import {clientsClaim} from "workbox-core";
import {registerRoute} from "workbox-routing/registerRoute";
import {CacheFirst} from "workbox-strategies/CacheFirst";
import {NetworkFirst} from "workbox-strategies/NetworkFirst";
import {
    CacheableResponsePlugin,
} from "workbox-cacheable-response/CacheableResponsePlugin";
import {ExpirationPlugin} from "workbox-expiration";

self.skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    /^https:\/\/shadowverse-evolve.com\/wordpress\/wp-content\/images\/cardlist\/.*\.png/,
    new CacheFirst({
        cacheName: "image-cache-v1",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);

registerRoute(
    /\/.*\.(png|jpg)/,
    new CacheFirst({
        cacheName: "image-cache-v1",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);

registerRoute(
    /\/.*\.(js|html|css)/,
    new NetworkFirst({
        cacheName: "static-cache-v1",
    }),
);

const savePostResponsePlugin = {
    cacheKeyWillBeUsed: async ({
        request,
        mode,
    }) => {
        if (mode === "write") {
            // Use the same URL as `POST` request as the cache key.
            // Alternatively, use a different URL.
            return request.url;
        }
    },
};

registerRoute(
    /\/api\//,
    new NetworkFirst({
        cacheName: "api-cache-v1",
        plugins: [
            savePostResponsePlugin,
            new ExpirationPlugin({
                maxAgeSeconds: 24 * 60 * 60,
            }),
        ],
    }),
    "POST",
);
