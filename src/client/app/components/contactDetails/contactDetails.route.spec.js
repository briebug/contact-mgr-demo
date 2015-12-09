/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function() {
    'use strict';

    describe('contactDetails route', function() {
        var template, state;

        template = '<cm-contact-details contact="vm.contact"></cm-contact-details>';

        beforeEach(function () {
            module('app.components.contactDetails');
            bard.inject(
                '$q',
                '$rootScope',
                '$state',
                '$templateCache',
                'contactService'
            );

            bard.mockService(contactService, mocks.ContactServiceMock($q));
            sinon.spy(contactService, 'getById');
        });

        beforeEach(function () {
            $templateCache.put(template, '');
            state = $state.get('contactDetails');
        });

        bard.verifyNoOutstandingHttpRequests();

        describe('State', function () {

            it('should map the state to url /contacts/:contactId', function () {
                expect(state.url).to.eq('/contacts/:contactId');
            });

            it('should map the state to the expected template', function () {
                expect(state.template).to.eq(template);
            });
        });

        describe('ContactDetailsController', function () {

            it('should be set to the state', function () {
                expect(state.controller).to.exist();
            });

            it('should set contact to vm', function () {
                var controller = new state.controller({test:'test'});
                expect(controller.contact).to.exist();
            });
        });

        describe('function loadContact()', function () {

            it('should call contactService.getById()', function () {
                var resolve = state.resolve.contact;

                var params = {contactId: '1'};
                resolve(params, contactService);
                $rootScope.$apply();

                expect(contactService.getById.calledWith('1')).to.be.true();
            });
        });
    });
})();
