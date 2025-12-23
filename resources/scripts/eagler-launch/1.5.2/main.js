"use strict";
// @ts-nocheck
window.addEventListener('load', function () {
    const relayId = Math.floor(Math.random() * 3);
    window.eaglercraftOpts = {
        container: 'game_frame',
        assetsURI: `${window.location.pathname}/assets.epk`,
        localesURI: `${window.location.pathname}/lang/`,
        serverWorkerURI: `${window.location.pathname}/worker_bootstrap.js`,
        worldsFolder: 'MAIN',
        servers: [
        /*{
            serverName: 'Example server',
            serverAddress: 'wss://example.com',
            hideAddress: false,
        },*/
        ],
        relays: [
            {
                addr: 'wss://relay.deev.is/',
                name: 'lax1dude relay #1',
                primary: relayId === 0,
            },
            {
                addr: 'wss://relay.lax1dude.net/',
                name: 'lax1dude relay #2',
                primary: relayId === 1,
            },
            {
                addr: 'wss://relay.shhnowisnottheti.me/',
                name: 'ayunami relay #1',
                primary: relayId === 2,
            },
        ],
        mainMenu: {
            splashes: [
                'Darviglet!',
                'eaglerenophile!',
                'You Eagler!',
                'Yeeeeeee!',
                'yeee',
                'EEEEEEEEE!',
                'You Darvig!',
                'You Vigg!',
                ':>',
                '|>',
                'You Yumpster!',
            ],
            eaglerLogo: false,
        },
    };
    const urlParams = new URLSearchParams(window.location.search);
    window.eaglercraftOpts.joinServer = urlParams.get('server') ?? undefined;
    main();
});
