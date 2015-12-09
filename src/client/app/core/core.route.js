(function() {
    'use strict';

    angular
        .module('app.core')
        .config(config);

    config.$inject = ['$locationProvider', '$urlRouterProvider'];
    function config($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/contacts');
    }

})();
