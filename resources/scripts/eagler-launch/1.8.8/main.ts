import { inflate, deflate } from 'pako';

declare global {
	interface Window {
		eaglercraftXOpts: EaglercraftXOpts;
		main: () => void;
	}
}

/**
 * The EaglercraftX 1.8 client is configured primarily through a variable called window.eaglercraftXOpts that must be set before the client starts up.
 * @default
 * const relayId = Math.floor(Math.random() * 3);
 * window.eaglercraftXOpts = {
 * 	demoMode: false,
 * 	container: "game_frame",
 * 	assetsURI: "assets.epk",
 * 	localesURI: "lang/",
 * 	worldsDB: "worlds",
 * 	servers: [
 *  	{ addr: "ws://localhost:8081/", name: "Local test server" }
 * 	],
 * 	relays: [
 * 		{ addr: "wss://relay.deev.is/", comment: "lax1dude relay #1", primary: relayId == 0 },
 * 		{ addr: "wss://relay.lax1dude.net/", comment: "lax1dude relay #2", primary: relayId == 1 },
 * 		{ addr: "wss://relay.shhnowisnottheti.me/", comment: "ayunami relay #1", primary: relayId == 2 }
 * 	],
 * };
 */
interface EaglercraftXOpts {
	/**
	 * the ID of the HTML element to create the canvas in
	 * @default 'game_frame'
	 */
	container: string;
	/**
	 * the URL of the assets.epk file
	 * @default 'assets.epk'
	 */
	assetsURI: string;
	/**
	 * the URL where extra .lang files can be found
	 * @default 'lang/'
	 */
	localesURI?: string;
	/**
	 * the default language to use for the game
	 * @default 'en_US'
	 */
	lang?: string;
	/**
	 * server address to join when the game launches
	 */
	joinServer?: string;
	/**
	 * the name of the IndexedDB database to store worlds in
	 * @default 'worlds'
	 */
	worldsDB?: string;
	/**
	 * the name of the IndexedDB database to store resource packs in
	 * @default 'resourcePacks'
	 */
	resourcePacksDB?: string;
	/**
	 * whether to launch the game in java edition demo mode
	 * @default false
	 */
	demoMode?: boolean;
	/**
	 * a list of default servers to display on the Multiplayer screen
	 * @default
	 * [
	 * 	{
	 * 		"addr": "ws://localhost:8081/",
	 * 		"hideAddr": false,
	 * 		"name": "Local test server"
	 *	}
	 * ]
	 */
	servers?: {
		/**
		 * server address
		 */
		addr: string;
		/**
		 * whether to hide the server address
		 * @default false
		 */
		hideAddr?: boolean;
		/**
		 * server name
		 */
		name: string;
	}[];
	/**
	 * the default list of shared world relays to use for invites
	 * @default
	 * [
	 * 	{
	 * 		"addr": "wss://relay.deev.is/",
	 * 		"primary": "$random_relay_primary_0",
	 * 		"comment": "lax1dude relay #1"
	 * 	},
	 * 	{
	 * 		"addr": "wss://relay.lax1dude.net/",
	 * 		"primary": "$random_relay_primary_1",
	 * 		"comment": "lax1dude relay #2"
	 * 	},
	 * 	{
	 * 		"addr": "wss://relay.shhnowisnottheti.me/",
	 * 		"primary": "$random_relay_primary_2",
	 * 		"comment": "ayunami relay #1"
	 * 	}
	 * ]
	 */
	relays?: {
		/**
		 * relay address
		 */
		addr: string;
		/**
		 * relay name
		 */
		comment: string;
		/**
		 * primary relay
		 * @default false
		 */
		primary?: boolean;
	}[];
	/**
	 * enables more verbose opengl error logging for the shaders
	 * @default false
	 */
	checkShaderGLErrors?: boolean;
	/**
	 * whether to show a "Download Offline" button on the title screen
	 * @default true
	 */
	enableDownloadOfflineButton?: boolean;
	/**
	 * overrides the download link for the "Download Offline" button
	 */
	downloadOfflineButtonLink?: string;
	/**
	 * enables support for showing the CSS "pointer" cursor over buttons
	 * @default false
	 */
	html5CursorSupport?: boolean;
	/**
	 * enables the certificate-based update system
	 * @default true
	 */
	allowUpdateSvc?: boolean;
	/**
	 * allows the client to download new updates it finds
	 * @default true
	 */
	allowUpdateDL?: boolean;
	/**
	 * print update certificates with invalid signatures to console
	 * @default false
	 */
	logInvalidCerts?: boolean;
	/**
	 * show a badge on the title screen indicating if digital signature is valid
	 * @default false
	 */
	enableSignatureBadge?: boolean;
	/**
	 * proprietary feature used in offline downloads
	 * @default true
	 */
	checkRelaysForUpdates?: boolean;
	/**
	 * can be used to disable the voice chat feature
	 * @default true
	 */
	allowVoiceClient?: boolean;
	/**
	 * can be used to disable the high poly FNAW skins
	 * @default true
	 */
	allowFNAWSkins?: boolean;
	/**
	 * can be used to change the prefix of the local storage keys
	 * @default '_eaglercraftX'
	 */
	localStorageNamespace?: string;
	/**
	 * can be used to disable the "Minceraft" title screen
	 * @default true
	 */
	enableMinceraft?: boolean;
	/**
	 * display crash reports when `window.onerror` is fired
	 * @default false
	 */
	crashOnUncaughtExceptions?: boolean;
	/**
	 * open debug console automatically at launch
	 * @default false
	 */
	openDebugConsoleOnLaunch?: boolean;
	/**
	 * close debug console beforeunload instead of unload
	 * @default false
	 */
	fixDebugConsoleUnloadListener?: boolean;
	/**
	 * if the server info webview should be allowed even on browsers without the required safety features
	 * @default false
	 */
	forceWebViewSupport?: boolean;
	/**
	 * if the `csp` attibute should be set on the server info webview for extra security
	 * @default true
	 */
	enableWebViewCSP?: boolean;
	/**
	 * can be used to disable server cookies
	 * @default true
	 */
	enableServerCookies?: boolean;
	/**
	 * if servers should be allowed to make the client reconnect to a different address
	 * @default true
	 */
	allowServerRedirects?: boolean;
	/**
	 * if the viewport meta tag and style attributes on old offline downloads and websites should be automatically patched
	 * @default true
	 */
	autoFixLegacyStyleAttr?: boolean;
	/**
	 * if the client should always show the boot menu on every launch
	 * @default false
	 */
	showBootMenuOnLaunch?: boolean;
	/**
	 * if the boot menu should only be allowed to launch signed clients
	 * @default false
	 */
	bootMenuBlocksUnsignedClients?: boolean;
	/**
	 * can be used to disable the boot menu entirely
	 * @default false
	 */
	allowBootMenu?: boolean;
	/**
	 * if the profanity filter should be forced enabled
	 * @default false
	 */
	forceProfanityFilter?: boolean;
	/**
	 * if the game should force the browser to only use WebGL 1.0 for the canvas
	 * @default false
	 */
	forceWebGL1?: boolean;
	/**
	 * if the game should force the browser to only use WebGL 2.0 for the canvas
	 * @default false
	 */
	forceWebGL2?: boolean;
	/**
	 * if the game should be allowed to create an `experimental-webgl` context
	 * @default true
	 */
	allowExperimentalWebGL1?: boolean;
	/**
	 * can be used to disable all OpenGL ES extensions to test the game on a pure WebGL 1.0/2.0 context
	 * @default true
	 */
	useWebGLExt?: boolean;
	/**
	 * if the game should `setTimeout(..., 0)` every frame instead of using MessageChannel hacks
	 * @default false
	 */
	useDelayOnSwap?: boolean;
	/**
	 * if OGG vorbis files should be decoded using the JOrbis Java OGG decoder instead of using the browser
	 * @default false
	 */
	useJOrbisAudioDecoder?: boolean;
	/**
	 * if the game should use XMLHttpRequest for downloading resources instead of the fetch API
	 * @default false
	 */
	useXHRFetch?: boolean;
	/**
	 * if the game should resize some GUIs relative to `window.visualViewport` (needed on mobile browsers when the keyboard is open)
	 * @default true
	 */
	useVisualViewport?: boolean;
	/**
	 * can be used to disable the runtime stack-trace deobfuscation, reduces micro stutters if the game is logging errors
	 * @default true
	 */
	deobfStackTraces?: boolean;
	/**
	 * if the game should use `data:` URLs instead of `blob:` URLs for loading certain resources
	 * @default false
	 */
	disableBlobURLs?: boolean;
	/**
	 * can be used to disable "Vigg's Algorithm", an algorithm that delays and combines multiple EaglercraftX packets together if they are sent in the same tick (does not affect regular Minecraft 1.8 packets)
	 * @default false
	 */
	eaglerNoDelay?: boolean;
	/**
	 * if worlds and resource packs should be stored in RAM instead of IndexedDB
	 * @default false
	 */
	ramdiskMode?: boolean;
	/**
	 * if the game should run the client and integrated server in the same context instead of creating a worker object
	 * @default false
	 */
	singleThreadMode?: boolean;
	/**
	 * can be used to define JavaScript callbacks for certain events
	 */
	hooks?: {
		/**
		 * JavaScript callback to save local storage keys
		 * @param key local storage key name as a string
		 * @param data base64-encoded byte array as a string
		 */
		localStorageSaved?: (key: 'p' | 'g' | 's' | 'r', data: string) => void;
		/**
		 * JavaScript callback to load local storage keys
		 * @param key local storage key name as a string
		 * @returns base64-encoded byte array as a string or `null` if the key does not exist
		 */
		localStorageLoaded?: (key: 'p' | 'g' | 's' | 'r') => string | null;
		/**
		 * JavaScript callback when a crash report is shown
		 * @param report crash report as a string
		 * @param customMessageCB callback function for appending text
		 */
		crashReportShow?: (
			report: string,
			customMessageCB: (customMessage: string) => void,
		) => void;
		/**
		 * JavaScript callback when the screen changes/resizes
		 * @param screenName screen name
		 * @param scaledWidth scaled width
		 * @param scaledHeight scaled height
		 * @param realWidth real width
		 * @param realHeight real height
		 * @param scaleFactor scale factor
		 */
		screenChanged?: (
			screenName: string,
			scaledWidth: number,
			scaledHeight: number,
			realWidth: number,
			realHeight: number,
			scaleFactor: number,
		) => void;
	};
	/**
	 * lets you load EaglerForge mods from eaglercraftxopts
	 * @example ['example.js', 'anothermod.js']
	 */
	Mods?: string[];
}

const base64Gzip = {
	compress: function (string: string): string {
		return btoa(
			String.fromCharCode(...deflate(new TextEncoder().encode(string))),
		);
	},
	decompress: function (string: string): string {
		return inflate(
			Uint8Array.from(atob(string), (c) => c.charCodeAt(0)),
			{ to: 'string' },
		);
	},
};

const storage = {
	local: {
		get: function (key: string) {
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
		set: function (
			key: string,
			value: string | number | object | boolean | null | undefined,
		) {
			const item = localStorage.getItem('minexlauncher-v2');
			if (item === null) {
				const json: Record<string, unknown> = {};
				json[key] = value;
				localStorage.setItem(
					'minexlauncher-v2',
					base64Gzip.compress(JSON.stringify(json)),
				);
			} else {
				const json = JSON.parse(base64Gzip.decompress(item));
				json[key] = value;
				localStorage.setItem(
					'minexlauncher-v2',
					base64Gzip.compress(JSON.stringify(json)),
				);
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
	localStorageNamespace:
		'_eaglercraftX_' + window.location.pathname.replace(/[^A-Za-z0-9]/g, '_'),
	Mods: storage.local.get('addons')?.mods ?? [],
};

const urlParams = new URLSearchParams(window.location.search);
const server = urlParams.get('server');
if (server) window.eaglercraftXOpts.joinServer = server;

window.onload = () => window.main();
