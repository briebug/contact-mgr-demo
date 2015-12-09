(function() {
    'use strict';

    angular
        .module('app.components.contacts')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('contactList', {
            url: '/contacts',
            template: '<cm-contacts contacts="vm.contacts"></cm-contacts>',
            controller: ContactsController,
            controllerAs: 'vm',
            resolve: {
                contacts: loadContacts
            }
        });
    }

    ContactsController.$inject = ['contacts'];
    function ContactsController(contacts) {
        var vm = this;
        vm.contacts = contacts;
    }

    loadContacts.$inject = ['contactService'];
    function loadContacts(contactService) {
        return contactService.getAll();
    }

})();
