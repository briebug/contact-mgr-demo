/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function() {
    'use strict';

    describe('cmContactDetails', function() {
        var scope, vm, element;
        var contact = mockData.getMockContacts()[0];

        beforeEach(function() {
            bard.appModule('app.components');
            bard.inject(
                '$compile',
                '$rootScope',
                '$state',
                '$q'
            );

            bard.mockService($state, mocks.StateMock($q));
            sinon.spy($state, 'go');
        });

        beforeEach(function() {
            scope = $rootScope.$new();
            scope.contact = contact;
            var template = '<cm-contact-details contact="contact"></cm-contact-details>';

            element = $compile(template)(scope);
            scope.$digest();
            vm = element.controller('cmContactDetails');
        });

        it('Opens the contact details directive', function() {
            expect(element).to.exist();
            expect(vm).to.exist();
        });

        describe('Unit Tests', function() {

            describe('function back()', function() {
                it('should redirect to the /contacts page', function() {
                    vm.back();
                    expect($state.go.calledWith('contactList')).to.be.true();
                });
            });

        });

        describe('Integration Tests', function() {

            describe('rendered view', function() {
                it('should contain the contact name in the sub-header', function() {
                    // check the subheader for the contact's first & last name
                    var name = element.find('h2').text();
                    expect(name).to.eq(contact.firstName + ' ' + contact.lastName);
                });

                it('should display the contact\'s name, email, phone, address, and join date', function() {
                    // ensure that the view displays all of the contact's information
                    var text = element.text();
                    expect(text.indexOf(contact.firstName + ' ' + contact.lastName)).to.be.above(-1);
                    expect(text.indexOf(contact.email)).to.be.above(-1);
                    expect(text.indexOf(contact.phone)).to.be.above(-1);
                    expect(text.indexOf(contact.address)).to.be.above(-1);
                    expect(text.indexOf(contact.city + ', ' + contact.state + ' ' + contact.zip)).to.be.above(-1);
                    expect(text.indexOf(contact.joinDate)).to.be.above(-1);
                });
            });
        });

    });
})();
