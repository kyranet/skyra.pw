if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise(async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()})),s.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},s=(s,c)=>{Promise.all(s.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(s)};self.define=(s,a,n)=>{c[s]||(c[s]=Promise.resolve().then(()=>{let c={};const t={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return c;case"module":return t;default:return e(s)}})).then(e=>{const s=n(...e);return c.default||(c.default=s),c})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Pif1HHljzuHsUV5ff47ln/_buildManifest.js",revision:"03e2f27b28c47ab0cdf11da885da6d5b"},{url:"/_next/static/Pif1HHljzuHsUV5ff47ln/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/26.1cb849beb24957e2928a.js",revision:"02331eb6311085d1dd54e369a941c396"},{url:"/_next/static/chunks/27.8e133c9ec282dda9318e.js",revision:"e2ad2fa1107628bdb7856eba0f53349e"},{url:"/_next/static/chunks/5eec9076b7122a47bb63baa280245b3614395d2a.95c957f16f0912e9c2f2.js",revision:"f96ba332f8dd51016b2e97b07df8179f"},{url:"/_next/static/chunks/605ae359aeb6c57bc457acc81770b5c05601038c.13867a8df190b532664a.js",revision:"b7db9a9e1dfc6c751475921e252292cb"},{url:"/_next/static/chunks/77cea48176d6d2463f6dae5d7871ba4fbb4bbe63.b1c71890068d456c17b4.js",revision:"3df8627c62c40a1ec14a9c11de5d20af"},{url:"/_next/static/chunks/80a90e4470d9b679dbf1313f581227d0a3a95299.84ed355090c684f87b97.js",revision:"3bcddb7e2bb25ea0bb5eef56435bb70d"},{url:"/_next/static/chunks/c9abf906bdd0bffd132ce85722fa038c3954dba4.7d85de0d6bbef78f5348.js",revision:"2b624203417abc28755366fa79ea1fe6"},{url:"/_next/static/chunks/cdf5c4ab98f1a841980b1367891e6e8148f2507d.58b0f4040abd722f0f51.js",revision:"e985e86f0a820436853c05ef2239bbde"},{url:"/_next/static/chunks/commons.da3c18ffcbce4688be16.js",revision:"ad8460ab9df69216b2e540e7a0340621"},{url:"/_next/static/chunks/framework.6d143803a42e0f94ce51.js",revision:"ea8ebbf63999b6c91bc54bf493f26d42"},{url:"/_next/static/chunks/main-fd877bbb6d3bb56cc4dd.js",revision:"9a02bab4389514e170a0b8c2b7b8449a"},{url:"/_next/static/chunks/pages/404-95f2d39ec27a4d6809e1.js",revision:"0ce20f3eb5f011940062ac61ae62eb4a"},{url:"/_next/static/chunks/pages/_app-b19339b57cb8071dc468.js",revision:"374f3c29ad3bbe1fede591838a33698f"},{url:"/_next/static/chunks/pages/_error-43f6e0d0d08197c7f399.js",revision:"c3440170fc84937f083b5f25cbd04b68"},{url:"/_next/static/chunks/pages/commands-f5a221172299634dc918.js",revision:"81d3a70cf0e6f1cbdb837626b10c21c1"},{url:"/_next/static/chunks/pages/guilds-73bab1688de2ee066fe5.js",revision:"2a39b7d38b6f1319bc06139cdfd7de75"},{url:"/_next/static/chunks/pages/guilds/%5B...id%5D-636898d188da740c3f98.js",revision:"f9f9c236be66d0bec5fd91ec91bb446e"},{url:"/_next/static/chunks/pages/index-76eaf72cd267565954b0.js",revision:"ce22b7410c275c808e522b88102276fd"},{url:"/_next/static/chunks/pages/join-052610957387f940fa2e.js",revision:"c20ee36788c5a08edc709b4056c3bdf1"},{url:"/_next/static/chunks/pages/login-f8e74e25075d2661a9fa.js",revision:"1a464089663107254e7fdc322cab1f1e"},{url:"/_next/static/chunks/pages/music/%5B...id%5D-be12b5b7f96ef7a129ef.js",revision:"e2fdff05741a98a548b18c5a7fed2ded"},{url:"/_next/static/chunks/pages/oauth/callback-80ad21f53fbd03ebd752.js",revision:"80d8c9c9f6a2cd9b94aa36513b2c08aa"},{url:"/_next/static/chunks/pages/oauth/guild-c081cd5d0556fe1f8a82.js",revision:"76da13029c3cc581c10121e945ee63b6"},{url:"/_next/static/chunks/pages/privacy-18c2f16ac72f0bd19bf0.js",revision:"c81aa153e763bb213f8287b14f0ccec4"},{url:"/_next/static/chunks/polyfills-1885a83346422fe39c62.js",revision:"8789bc4c945490c0f8eb6b721e2de457"},{url:"/_next/static/chunks/polyfills-core-js.8b8fd991593cf7d5b54f.js",revision:"7a764bb518cda10b386daa0fe6b2c812"},{url:"/_next/static/chunks/polyfills-dom.f738b515e33bdc964afd.js",revision:"cef5bd357b49f96243622d1d7b29195f"},{url:"/_next/static/chunks/webpack-608207403f3033603e04.js",revision:"dbd1c70f7151532db14a83c03745b405"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
