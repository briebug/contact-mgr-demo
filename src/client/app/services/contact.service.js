(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('contactService', contactService);

    function contactService($http) {
        var service = {
            getAll: getAll,
            getById: getById
        };

        return service;

        ////////////

        function getAll() {
            return $http.get('/api/data')
                .then(function(res) {
                    return res.data;
                });
        }

        function getById(id) {
            return $http.get('/api/data/' + id)
                .then(function(res) {
                    return res.data;
                });
        }
    }

})();
