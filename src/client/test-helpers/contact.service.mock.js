var mocks = mocks || {};

(function (mocks) {
    'use strict';

    mocks.ContactServiceMock = function ($q) {
        var service = {
            getAll: getAll,
            getById: getById
        };

        return service;

        ////////////

        function getAll() {
            return $q.when([]);
        }

        function getById(id) {
            return $q.when({});
        }

    };
})(mocks);
