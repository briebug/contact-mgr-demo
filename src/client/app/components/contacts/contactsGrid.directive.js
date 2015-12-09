(function() {
    'use strict';

    angular
        .module('app.components.contacts')
        .directive('cmContactsGrid', contactsGrid);

    function contactsGrid() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/contacts/contactsGrid.html',
            scope: {
                contacts: '=',
                currentPage: '=',
                itemsPerPage: '=',
                onSelect: '&'
            },
            controller: ContactsGridController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ContactsGridController.$inject = ['$scope'];
    function ContactsGridController($scope) {
        var vm = this;

        vm.init = init;
        vm.select = select;

        ////////////

        function init() {
            vm.pagedContacts = [];

            // watches for changes to the contacts collection, the current page, or the items-per-page dropdown
            // and updates the displayed list of contacts accordingly
            $scope.$watchCollection('[vm.contacts, vm.currentPage, vm.itemsPerPage]', function() {
                var start, end;

                if (vm.contacts) {
                    start = (vm.currentPage - 1) * vm.itemsPerPage;
                    end = start + parseInt(vm.itemsPerPage, 10);
                    vm.pagedContacts = vm.contacts.slice(start, end);
                }
            });
        }

        function select(id) {
            vm.onSelect({contactId: id});
        }
    }

})();
