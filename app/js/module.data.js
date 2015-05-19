/* js/module.data.js */
/* globals angular, Firebase */

'use strict';

angular.module('module.data', [])
    .value('oURL', {
        icons: {
            menu: '/img/icons/ic_menu_24px.svg',
            home: '/img/icons/ic_home_24px.svg',
            moreVert: '/img/icons/ic_more_vert_24px.svg',
            accountCircle: '/img/icons/ic_account_circle_24px.svg',
            scenarios: '/img/icons/ic_collections_24px.svg',
            explore: '/img/icons/ic_explore_24px.svg',
            map: '/img/icons/ic_insert_photo_24px.svg'
        },
        partials: {
            menu: '/partials/menu.html'
        },
        paths: {
            home: '/',
            login: '/login',
            preferences: '/preferences',
            scenarios: '/scenarios'
        }
    })
    .value('oObjectives', [
        {name: 'Arcane Wonder'},
        {name: 'Armory'},
        {name: 'Bunker'},
        {name: 'Effigy of Valor'},
        {name: 'Fuel Cache'},
        {name: 'Stockpile'}
    ])
    .value('oScenarios', [
        {
            id: 'destruction',
            name: 'Destruction',
            killBox: true,
            texts: [
                'Mark a zone (12˝ × 6˝ rectangle) and place two objectives in accordance with the diagram below.',
                'The objective on Player 1’s side of the table is a friendly Faction model to Player 1 and vice versa.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)',
                'Zone: Control = 1 CP, Dominate = 2 CP'],
            image: '/img/scenarios/destruction.png'
        },
        {
            id: 'two-fronts',
            name: 'Two Fronts',
            killBox: true,
            texts: [
                'Mark two zones (12˝ × 6˝ rectangles) and place two objectives in accordance with the diagram below.',
                'The objective on Player 1’s side of the table is a friendly Faction model to Player 1 and vice versa.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Friendly Zone: Dominate = 1 CP',
                'Enemy Zone: Control = 1 CP, Dominate = 2 CP',
                'Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)'],
            image: '/img/scenarios/two-fronts.png'
        },
        {
            id: 'close-quarters',
            name: 'Close Quarters',
            killBox: true,
            texts: [
                'Place two flags in accordance with the diagram below.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Friendly Flag: Dominate = 1 CP',
                'Enemy Flag: Control = 1 CP, Dominate = 2 CP'],
            image: '/img/scenarios/close-quarters.png'
        },
        {
            id: 'fire-support',
            name: 'Fire Support',
            killBox: true,
            texts: [
                'Place two flags and two objectives in accordance with the diagram below.',
                'The objective on Player 1’s side of the table is a friendly Faction model to Player 1 and vice versa.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Friendly Flag: Dominate = 1 CP',
                'Enemy Flag: Control = 1 CP, Dominate = 2 CP',
                'Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)'],
            image: '/img/scenarios/fire-support.png'
        },
        {
            id: 'incoming',
            name: 'Incoming',
            killBox: false,
            texts: [
                'Mark two zones (12˝ × 6˝ rectangles) and place two objectives in accordance with the diagram below.',
                'The objective on Player 1’s side of the table is a friendly Faction model to Player 1 and vice versa.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Friendly Zone: Dominate = 1 CP',
                'Enemy Zone: Control = 1 CP, Dominate = 2 CP',
                'Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)'],
            image: '/img/scenarios/incoming.png'
        },
        {
            id: 'incursion',
            name: 'Incursion',
            killBox: false,
            texts: [
                'Place three flags in accordance with the diagram below.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Flag: Control = 1 CP, Dominate = 1 CP'],
            image: '/img/scenarios/incursion.png'
        },
        {
            id: 'outflank',
            name: 'Outflank',
            killBox: false,
            texts: [
                'Mark two zones (12˝-diameter circles) in accordance with the diagram below.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Zone: Control = 1 CP, Dominate = 2 CP'],
            image: '/img/scenarios/outflank.png'
        },
        {
            id: 'recon',
            name: 'Recon',
            killBox: false,
            texts: [
                'Mark a zone (6˝ × 12˝ rectangle) and place two flags and two objectives in accordance with the diagram below.',
                'The objective on Player 1’s side of the table is a friendly Faction model to Player 1 and vice versa.',
                'Starting on the second player’s second turn, at the end of each player’s turn a player earns control points (CP) as follows:'],
            points: [
                'Zone: Control = 1 CP, Dominate = 2 CP',
                'Flag: Dominate = 1 CP',
                'Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)'],
            image: '/img/scenarios/recon.png'
        }
        
    ]);