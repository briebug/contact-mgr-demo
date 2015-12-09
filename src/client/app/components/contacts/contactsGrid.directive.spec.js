/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function() {
    'use strict';

    describe('cmContactsGrid', function() {
        var scope, vm, element, contacts;

        contacts = mockData.getMockContacts();

        beforeEach(function() {
            bard.appModule('app.components');
            bard.inject(
                '$compile',
                '$rootScope'
            );
        });

        beforeEach(function() {
            scope = $rootScope.$new();
            scope.contacts = contacts.slice();
            scope.currentPage = 1;
            scope.itemsPerPage = 3;
            scope.onSelect = function(contactId) {};
            var template = '<cm-contacts-grid contacts="contacts" current-page="currentPage" items-per-page="itemsPerPage" on-select="onSelect(contactId)"></cm-contacts-grid>';

            element = $compile(template)(scope);
            scope.$digest();
            vm = element.controller('cmContactsGrid');

            sinon.spy(scope, 'onSelect');
        });

        it('Opens the contacts grid directive', function() {
            expect(element).to.exist();
            expect(vm).to.exist();
        });

        describe('Unit Tests', function() {

            describe('function select()', function() {
                it('should call the passed in onSelect function with the contact id', function() {
                    vm.select('1');
                    expect(scope.onSelect.calledWith('1')).to.be.true();
                });
            });

            describe('watches', function() {
                it('should initially set the contents of the pagedContacts collection from the passed in contacts, currentPage and itemsPerPage values', function() {
                    expect(vm.pagedContacts.length).to.eq(3);
                });

                it('should change the contents of the pagedContacts collection if the contacts collection changes', function() {
                    scope.contacts = scope.contacts.splice(0, 2);
                    scope.$digest();
                    expect(vm.pagedContacts.length).to.eq(2);
                    scope.contacts = contacts;
                });

                it('should change the contents of the pagedContacts collection if the currentPage changes', function() {
                    scope.currentPage = 2;
                    scope.$digest();
                    expect(vm.pagedContacts.length).to.eq(2);
                    scope.currentPage = 1;
                });

                it('should change the contents of the pagedContacts collection if the itemsPerPage changes', function() {
                    scope.itemsPerPage = 4;
                    scope.$digest();
                    expect(vm.pagedContacts.length).to.eq(4);
                    scope.itemsPerPage = 3;
                });
            });

        });

        describe('Integration Tests', function() {

            describe('rendered view', function() {
                it('should display the have the correct number of contacts', function() {
                    // if there are 5 contacts and the items per page is 3, then there should be 3 contacts in the list
                    var els = element.find('.contact-list ul .list-item');
                    expect(els.length).to.eq(3);
                });

                it('should display each contact\'s name, phone, email and state', function() {
                    // the first list item should display the first contact's information
                    var el = element.find('.contact-list ul .list-item').eq(0);
                    var text = el.text();
                    expect(text.indexOf(vm.pagedContacts[0].lastName + ', ' + vm.pagedContacts[0].firstName)).to.be.above(-1);
                    expect(text.indexOf(vm.pagedContacts[0].phone)).to.be.above(-1);
                    expect(text.indexOf(vm.pagedContacts[0].email)).to.be.above(-1);
                    expect(text.indexOf(vm.pagedContacts[0].state)).to.be.above(-1);
                });

                it('should reflect any changes to the pagedContacts collection', function() {
                    // reduce the contacts list to 2 items, and check that the grid displays those two items
                    vm.pagedContacts = vm.pagedContacts.splice(1, 2);
                    scope.$digest();
                    var els = element.find('.contact-list ul .list-item');
                    expect(els.length).to.eq(2);
                    var text = els.eq(0).text();
                    expect(text.indexOf(vm.pagedContacts[0].lastName + ', ' + vm.pagedContacts[0].firstName)).to.be.above(-1);
                });
            });

        });

    });
})();
