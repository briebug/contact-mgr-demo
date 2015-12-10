/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function() {
    'use strict';

    describe('cmContacts', function() {
        var scope, vm, template, element, contacts;

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
            scope.contacts = mockData.getMockContacts();
            template = '<cm-contacts contacts="contacts"></cm-contacts>';

            element = $compile(template)(scope);
            scope.$digest();
            vm = element.controller('cmContacts');

            sinon.spy(vm, 'onSelect');
        });

        it('Opens the contacts directive', function() {
            expect(element).to.exist();
            expect(vm).to.exist();
        });

        describe('Unit Tests', function() {

            describe('function init()', function() {
                it('should set filteredContacts to vm', function() {
                    vm.init();
                    expect(vm.filteredContacts.length).to.eq(5);
                });

                it('should set itemsPerPage to vm', function() {
                    vm.init();
                    expect(vm.itemsPerPage).to.eq(10);
                });

                it('should set filteredContacts to vm', function() {
                    vm.init();
                    expect(vm.currentPage).to.eq(1);
                });

                it('should sort the contacts list by last name', function() {
                    vm.init();
                    expect(vm.contacts[0].lastName).to.eq('Anderson');
                    expect(vm.contacts[4].lastName).to.eq('Smith');
                });
            });

            describe('function onFilter()', function() {
                it('should not change the filteredContacts collection if no filter values are passed in', function() {
                    vm.onFilter();
                    expect(vm.filteredContacts.length).to.eq(5);
                    expect(vm.filteredContacts[0].lastName).to.eq('Anderson');
                    expect(vm.filteredContacts[4].lastName).to.eq('Smith');
                });

                it('should not change the filteredContacts collection if empty filter values are passed in', function() {
                    vm.onFilter('', '');
                    expect(vm.filteredContacts.length).to.eq(5);
                    expect(vm.filteredContacts[0].lastName).to.eq('Anderson');
                    expect(vm.filteredContacts[4].lastName).to.eq('Smith');
                });

                it('should reduce the filteredContacts collection if a text value is passed in', function() {
                    vm.onFilter('l');
                    expect(vm.filteredContacts.length).to.eq(2);
                    expect(vm.filteredContacts[0].lastName).to.eq('Anderson');
                    expect(vm.filteredContacts[1].lastName).to.eq('Johnson');
                });

                it('should reduce the filteredContacts collection if a state value is passed in', function() {
                    vm.onFilter('', 'CO');
                    expect(vm.filteredContacts.length).to.eq(2);
                    expect(vm.filteredContacts[0].lastName).to.eq('Anderson');
                    expect(vm.filteredContacts[1].lastName).to.eq('Doe');
                });

                it('should reduce the filteredContacts collection if both a text and a state value are passed in', function() {
                    vm.onFilter('j', 'CO');
                    expect(vm.filteredContacts.length).to.eq(1);
                    expect(vm.filteredContacts[0].lastName).to.eq('Doe');
                });
            });

            describe('function onSelect()', function() {
                it('should redirect to the contact details page', function() {
                    vm.onSelect('1');
                    expect($state.go.calledWith('contactDetails', {contactId: '1'})).to.be.true();
                });
            });

        });

        describe('Integration Tests', function() {

            describe('rendered view', function() {
                it('should reduce the number of contacts listed if the "search by name" field is populated', function() {
                    // populate the search by name field in the filter compoment and check that the grid component displays the
                    // expected results
                    var el = element.find('.contact-filters input');
                    el.val('j');
                    el.triggerHandler('change');

                    var els = element.find('.contact-list ul .list-item');
                    expect(els.length).to.eq(4);
                });

                it('should reduce the number of contacts listed if the "filter by state" dropdown option is changed', function() {
                    // select a state in the filter by state field in the filter compoment and check that the grid component displays
                    // the expected results
                    var el = element.find('.contact-filters select');
                    el.find('option').eq(2).prop('selected', true);
                    el.triggerHandler('change');

                    var els = element.find('.contact-list ul .list-item');
                    expect(els.length).to.eq(2);
                });

                it('should change the number of contacts listed if the "items per page" dropdown option is changed', function() {
                    // change the selection in the items per page downdown in the filter compoment and check that the grid component
                    // displays the expected results
                    scope.contacts = mockData.getLargeMockContacts(); //use a larger data set for this test
                    element = $compile(template)(scope);
                    scope.$digest();

                    var els = element.find('.contact-list ul .list-item');
                    expect(els.length).to.eq(10);

                    var el = element.find('.contact-filters .select-state');
                    el.find('option').eq(1).prop('selected', true);
                    el.triggerHandler('change');

                    els = element.find('.contact-list ul .list-item');
                    expect(els.length).to.eq(5);
                });

                it('should change which contacts are listed if a different page is clicked in the pagination control', function() {
                    // select a different page in the pagination component and check that the grid component displays the expected
                    // results
                    scope.contacts = mockData.getLargeMockContacts(); //use a larger data set for this test
                    element = $compile(template)(scope);
                    scope.$digest();

                    var page2El = element.find('.pagination ul .page').eq(1);
                    page2El.triggerHandler('click');

                    var firstContactEl = element.find('.contact-list .list-item').eq(0);
                    expect(firstContactEl.text().indexOf('11, 11')).to.be.above(-1);
                });

                it('should call the onSelected function when a contact is clicked', function() {
                    // click a contact in the grid component and check that the onSelected function in the contacts component is called
                    var el = element.find('.contact-list ul .list-item').eq(0).find('a');
                    el.triggerHandler('click');
                    expect(vm.onSelect.calledWith(3)).to.be.true();
                });
            });
        });

    });
})();
