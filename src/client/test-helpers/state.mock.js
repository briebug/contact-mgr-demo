var mocks = mocks || {};

(function (mocks) {
    'use strict';

    var currentState = '';
    var currentParams = {};
    var reloaded = false;

    mocks.StateMock = function ($q) {
        return {
            go: go,
            href: href,
            is: is,
            transitionTo: transitionTo,
            reload: reload,
            hasReloaded: hasReloaded,
            getNewParams: getNewParams
        };

        function transitionTo(newState) {
            currentState = newState;
            return $q.when({});
        }

        function href() {
            return {};
        }

        function is(query) {
            return query === currentState;
        }

        function go(newState, params) {
            currentState = newState;
            currentParams = params;
            return $q.when({currentState: currentState});
        }

        function getNewParams() {
            return currentParams;
        }

        function reload() {
            reloaded = true;
        }

        function hasReloaded() {
            return reloaded;
        }
    };
})(mocks);
