(function() {
    'use strict';

    angular
        .module('app.components.contactDetails')
        .directive('cmContactDetails', contactDetails);

    function contactDetails() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/contactDetails/contactDetails.html',
            scope: {
                contact: '='
            },
            controller: ContactDetailsController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ContactDetailsController.$inject = ['$state'];
    function ContactDetailsController($state) {
        var vm = this;

        vm.back = back;

        ////////////

        // returns to the contacts list view
        function back() {
            $state.go('contactList');
        }
    }

})();
