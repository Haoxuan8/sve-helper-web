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

// 不缓存index.html，会导致离线情况下无法访问网站。
// TODO: 目前处于功能开发阶段，更新频繁，先不缓存index.html，等稳定了后再缓存
const toPrecache = self.__WB_MANIFEST.filter(
    (file) => !file.url.includes("index.html"),
);

precacheAndRoute(toPrecache);

registerRoute(
    ({url}) => url.pathname.includes("index.html"),
    new NetworkFirst(),
);

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

// TODO: 缓存POST响应到IndexedDB
// registerRoute(
//     /\/api\//,
//     ({
//         request,
//         event,
//     }) => {
//     },
//     "POST",
// );
