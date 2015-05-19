/* js/main.js */
/* globals angular, Firebase */

'use strict';

angular.module('kovnik', ['ngRoute', 'ngMaterial', 'firebase', 'module.data'])
    .config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider
            .when('/', {
               templateUrl: '/templates/home.html',
               controller: 'HomeCtrl'
            })
            .when('/login', {
               templateUrl: '/templates/login.html',
               controller: 'LoginCtrl'
            })
            .when('/scenarios', {
               templateUrl: '/templates/scenarios.html',
               controller: 'ScenariosCtrl'
            })
            .when('/scenarios/:id', {
               templateUrl: '/templates/scenario.html',
               controller: 'ScenarioCtrl'
            })
            .when('/preferences', {
               templateUrl: '/templates/preferences.html',
               controller: 'PreferencesCtrl'
            })
/*
.when('/List/:listId', {
    templateUrl: 'list.html',
    controller: 'ListCtrl',
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
    controller: 'ListVersionCtrl'
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
    .controller('AppCtrl', ['$scope', '$mdSidenav', '$location', 'oURL', '$rootScope', function ($scope, $mdSidenav, $location, oURL, $rootScope) {
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
    .controller('HomeCtrl', ['$scope', 'oURL', '$rootScope', function ($scope, oURL, $rootScope) {
        $scope.oURL = oURL;
        $rootScope.subtitle = '';
    }])
    .controller('LoginCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.subtitle = '';
        // ...
    }])
    .controller('ScenariosCtrl', ['$scope', '$location', 'oScenarios', 'oURL', '$rootScope', function ($scope, $location, oScenarios, oURL, $rootScope) {
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
    .controller('ScenarioCtrl', ['$scope', '$location', '$routeParams', 'oScenarios', '$rootScope', function ($scope, $location, $routeParams, oScenarios, $rootScope) {
        $scope.scenarios = oScenarios;
        $scope.data = oScenarios.filter(function (poItem) {return poItem.id == $routeParams.id;})[0];
        $rootScope.subtitle = '/ Escenarios / ' + $scope.data.name;
        
        // ...
    }])
    .controller('PreferencesCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
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