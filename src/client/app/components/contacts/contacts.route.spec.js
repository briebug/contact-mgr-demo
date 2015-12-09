/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function() {
    'use strict';

    describe('contacts route', function() {
        var template, state;

        template = '<cm-contacts contacts="vm.contacts"></cm-contacts>';

        beforeEach(function () {
            module('app.components.contacts');
            bard.inject(
                '$q',
                '$rootScope',
                '$state',
                '$templateCache',
                'contactService'
            );

            bard.mockService(contactService, mocks.ContactServiceMock($q));
            sinon.spy(contactService, 'getAll');
        });

        beforeEach(function () {
            $templateCache.put(template, '');
            state = $state.get('contactList');
        });

        bard.verifyNoOutstandingHttpRequests();

        describe('State', function () {

            it('should map the state to url /contacts', function () {
                expect(state.url).to.eq('/contacts');
            });

            it('should map the state to the expected template', function () {
                expect(state.template).to.eq(template);
            });
        });

        describe('ContactsController', function () {

            it('should be set to the state', function () {
                expect(state.controller).to.exist();
            });

            it('should set contacts to vm', function () {
                var controller = new state.controller([{test:'test'}]);
                expect(controller.contacts).to.exist();
            });
        });

        describe('function loadContacts()', function () {

            it('should call contactService.getAll()', function () {
                var resolve = state.resolve.contacts;

                resolve(contactService);
                $rootScope.$apply();

                expect(contactService.getAll.called).to.be.true();
            });
        });
    });
})();
