import { inflate, deflate } from 'pako';
const base64Gzip = {
    compress: function (string) {
        return btoa(String.fromCharCode(...deflate(new TextEncoder().encode(string))));
    },
    decompress: function (string) {
        return inflate(Uint8Array.from(atob(string), (c) => c.charCodeAt(0)), { to: 'string' });
    },
};
const storage = {
    local: {
        get: function (key) {
            const item = localStorage.getItem('minexlauncher-v2');
            if (item !== null) {
                const json = JSON.parse(base64Gzip.decompress(item));
                if (json[key] !== undefined) {
                    return json[key];
                }
                return undefined;
            }
            return undefined;
        },
        set: function (key, value) {
            const item = localStorage.getItem('minexlauncher-v2');
            if (item === null) {
                const json = {};
                json[key] = value;
                localStorage.setItem('minexlauncher-v2', base64Gzip.compress(JSON.stringify(json)));
            }
            else {
                const json = JSON.parse(base64Gzip.decompress(item));
                json[key] = value;
                localStorage.setItem('minexlauncher-v2', base64Gzip.compress(JSON.stringify(json)));
            }
        },
    },
};
const randomRelay = Math.floor(Math.random() * 3);
window.eaglercraftXOpts = {
    container: 'game_frame',
    assetsURI: 'assets.epk',
    servers: [
        { addr: 'wss://temuzx.xyz', name: 'TemuzX' },
        { addr: 'wss://mc.ricenetwork.xyz', name: 'Rice Network' },
        { addr: 'wss://webmc.xyz/server', name: 'WebMC OneBlock' },
        { addr: 'wss://mc.lamplifesteal.xyz', name: 'LampLifesteal' },
    ],
    relays: [
        {
            addr: 'wss://relay.deev.is',
            comment: 'lax1dude relay #1',
            primary: randomRelay === 0,
        },
        {
            addr: 'wss://relay.lax1dude.net',
            comment: 'lax1dude relay #2',
            primary: randomRelay === 1,
        },
        {
            addr: 'wss://relay.shhnowisnottheti.me',
            comment: 'ayunami relay #1',
            primary: randomRelay === 2,
        },
    ],
    localStorageNamespace: '_eaglercraftX_' + window.location.pathname.replace(/[^A-Za-z0-9]/g, '_'),
    Mods: storage.local.get('addons')?.mods ?? [],
};
const urlParams = new URLSearchParams(window.location.search);
const server = urlParams.get('server');
if (server)
    window.eaglercraftXOpts.joinServer = server;
window.onload = () => window.main();
