(function() {
    'use strict';

    angular
        .module('app.components.contactDetails')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('contactDetails', {
            url: '/contacts/:contactId',
            template: '<cm-contact-details contact="vm.contact"></cm-contact-details>',
            controller: ContactDetailController,
            controllerAs: 'vm',
            resolve: {
                contact: loadContact
            }
        });
    }

    ContactDetailController.$inject = ['contact'];
    function ContactDetailController(contact) {
        var vm = this;
        vm.contact = contact;
    }

    loadContact.$inject = ['$stateParams', 'contactService'];
    function loadContact($stateParams, contactService) {
        return contactService.getById($stateParams.contactId);
    }

})();
