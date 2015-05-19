/* js/main.js */
/* globals angular, Firebase */
(function (document) {
    'use strict';
    
    angular.module('kovnik', ['ngRoute', 'ngMaterial', 'firebase'])
    .config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider
            .when('/', {
               templateUrl: '/templates/home.html',
               controller: 'HomeController'
            })
            .when('/login', {
               templateUrl: '/templates/login.html',
               controller: 'LoginController'
            })
            .when('/scenarios', {
               templateUrl: '/templates/scenarios.html',
               controller: 'ScenariosController'
            })
            .when('/scenarios/:id', {
               templateUrl: '/templates/scenario.html',
               controller: 'ScenarioController'
            })
            .when('/preferences', {
               templateUrl: '/templates/preferences.html',
               controller: 'PreferencesController'
            })
/*
.when('/List/:listId', {
    templateUrl: 'list.html',
    controller: 'ListController',
    resolve: {
      // I will cause a 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
      }
    }
})
.when('/List/:listId/v/:versionId', {
    templateUrl: 'listVersion.html',
    controller: 'ListVersionController'
})*/
            .otherwise({
                redirectTo: '/'
            });
    
        // configure html5 to get links working
        $locationProvider.html5Mode(true);
        
        // configure md theme
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('orange')
            .warnPalette('yellow');
    }])
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
        
    ])
    .controller('AppController', ['$scope', '$mdSidenav', '$location', 'oURL', '$rootScope', function ($scope, $mdSidenav, $location, oURL, $rootScope) {
        $scope.oURL = oURL;
        $rootScope.subtitle = '';
        
        $scope.openMenu = function(poEvent) {
            $mdSidenav('left').toggle();
        };
        
        $scope.openPreferences = function(poEvent) {
            $location.path(oURL.paths.preferences);
        };
    }])
    // '$route', '$routeParams', '$location', '$firebase',
    .controller('HomeController', ['$scope', 'oURL', '$rootScope', function ($scope, oURL, $rootScope) {
        $scope.oURL = oURL;
        $rootScope.subtitle = '';
    }])
    .controller('LoginController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.subtitle = '';
        // ...
    }])
    .controller('ScenariosController', ['$scope', '$location', 'oScenarios', 'oURL', '$rootScope', function ($scope, $location, oScenarios, oURL, $rootScope) {
        $scope.scenarios = oScenarios;
        $rootScope.subtitle = '/ Escenarios';
        $scope.goToScenario = function (pcIdScenario, poEvent) {
            $location.path(oURL.paths.scenarios + '/' + pcIdScenario);
        };
        $scope.randomScenario = function (poEvent) {
            $scope.goToScenario(oScenarios[Math.floor(Math.random() * (7))].id);
        };
        // ...
    }])
    .controller('ScenarioController', ['$scope', '$location', '$routeParams', 'oScenarios', '$rootScope', function ($scope, $location, $routeParams, oScenarios, $rootScope) {
        $scope.scenarios = oScenarios;
        $scope.data = oScenarios.filter(function (poItem) {return poItem.id == $routeParams.id;})[0];
        $rootScope.subtitle = '/ Escenarios / ' + $scope.data.name;
        
        // ...
    }])
    .controller('PreferencesController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.subtitle = '';
        // ...
    }])
    .controller('MenuItemsCtrl', ['$scope', '$mdSidenav', '$location', 'oURL', function ($scope, $mdSidenav, $location, oURL) {
        $scope.navigateTo = function (pcSection, poEvent) {
            $location.path(oURL.paths[pcSection]);
            // seleccionar menu item
            // ...
            $mdSidenav('left').toggle();
        };
    }]);
})(document);