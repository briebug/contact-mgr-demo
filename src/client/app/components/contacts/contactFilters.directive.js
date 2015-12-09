(function() {
    'use strict';

    angular
        .module('app.components.contacts')
        .directive('cmContactFilters', contactFilters);

    function contactFilters() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/contacts/contactFilters.html',
            scope: {
                contacts: '=',
                itemsPerPage: '=',
                onFilter: '&'
            },
            controller: ContactFiltersController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ContactFiltersController.$inject = ['$scope'];
    function ContactFiltersController($scope) {
        var vm = this;

        vm.init = init;
        vm.filter = filter;

        ////////////

        function init() {
            // need to extract states from the contact list whenever the list changes
            $scope.$watch('vm.contacts', function() {
                var i, len, s, states;

                states = [];
                for (i = 0, len = vm.contacts.length; i < len; i++) {
                    s = vm.contacts[i].state;
                    if (states.indexOf(s) < 0) {
                        states.push(s);
                    }
                }
                states.sort();
                vm.states = states;
            });
        }

        function filter() {
            vm.onFilter({
                text: vm.filterText,
                state: vm.filterState
            });
        }
    }

})();
