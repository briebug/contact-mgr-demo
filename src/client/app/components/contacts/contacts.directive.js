(function() {
    'use strict';

    angular
        .module('app.components.contacts')
        .directive('cmContacts', contacts);

    function contacts() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/contacts/contacts.html',
            scope: {
                contacts: '='
            },
            controller: ContactsController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ContactsController.$inject = ['$scope', '$state', '$timeout'];
    function ContactsController($scope, $state, $timeout) {
        var vm = this;

        vm.init = init;
        vm.onFilter = onFilter;
        vm.onSelect = onSelect;

        ////////////

        function init() {
            // sort contacts
            vm.contacts.sort(function(a, b) {
                var x = a.lastName.toLowerCase(), y = b.lastName.toLowerCase();
                return x < y ? -1 : (x > y ? 1 : 0);
            });

            // initialize scope variables
            vm.filteredContacts = vm.contacts;
            vm.itemsPerPage = 10;
            vm.currentPage = 1;
        }

        // applies the filters to the collection
        function onFilter(text, state) {
            if (!text) {
                vm.nameFilteredContacts = vm.contacts;
            } else {
                text = text.toLowerCase();
                vm.nameFilteredContacts = vm.contacts.filter(function(item) {
                    return (item.firstName.toLowerCase().indexOf(text) > -1 ||
                        item.lastName.toLowerCase().indexOf(text) > -1);
                });
            }

            if (!state) {
                vm.filteredContacts = vm.nameFilteredContacts;
            } else {
                vm.filteredContacts = vm.nameFilteredContacts.filter(function(item) {
                    return (item.state === state);
                });
            }
            vm.currentPage = 1;
        }

        // loads the contact view for the selected contact
        function onSelect(contactId) {
            $state.go('contactDetails', {contactId: contactId});
        }
    }

})();
