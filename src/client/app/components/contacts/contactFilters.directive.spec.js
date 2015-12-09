/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function() {
    'use strict';

    describe('cmContactFilters', function() {
        var scope, vm, element, contacts;

        beforeEach(function() {
            bard.appModule('app.components');
            bard.inject(
                '$compile',
                '$rootScope'
            );

            contacts = mockData.getMockContacts();
        });

        beforeEach(function() {
            scope = $rootScope.$new();
            scope.contacts = contacts;
            scope.itemsPerPage = 5;
            scope.onFilter = function(text, state) {};
            var template = '<cm-contact-filters contacts="contacts" items-per-page="itemsPerPage"' +
                ' on-filter="onFilter(text, state)"></cm-contact-filters>';

            element = $compile(template)(scope);
            scope.$digest();
            vm = element.controller('cmContactFilters');

            sinon.spy(scope, 'onFilter');
        });

        it('Opens the contact filters directive', function() {
            expect(element).to.exist();
            expect(vm).to.exist();
        });

        describe('Unit Tests', function() {

            describe('function filter()', function() {
                it('should call the passed in onFilter function with the text and state filter values', function() {
                    vm.filterText = 'my text';
                    vm.filterState = 'CO';
                    vm.filter();
                    expect(scope.onFilter.calledWith('my text', 'CO')).to.be.true();
                });
            });

            describe('watches', function() {
                it('should initially set the contents of the state collection from the contacts collection', function() {
                    expect(vm.states.length).to.eq(4);
                });

                it('should change the contents of the states collection if the contacts collection changes', function() {
                    vm.contacts = vm.contacts.splice(0, 3);
                    scope.$digest();
                    expect(vm.states.length).to.eq(2);
                });
            });

        });

        describe('Integration Tests', function() {

            describe('states dropdown', function() {
                it('should have the correct number of options', function() {
                    // for the mock data set, the state dropdown should be populated with 4 states plus a default option
                    var els = element.find('.contact-filters .select-state option');
                    expect(els.length).to.eq(5); //4 states plus a 'none' option
                });

                it('should have "filter by state" as the first option', function() {
                    // the first option in the dropdown should be 'filter by state'
                    var els = element.find('.contact-filters .select-state option');
                    expect(els[0].innerHTML).to.eq('filter by state');
                });

                it('should have the states alphabetized', function() {
                    // the states in the dropdown shoudl be worted alphabetically
                    var els = element.find('.contact-filters .select-state option');
                    expect(els[1].innerHTML).to.eq('AR');
                    expect(els[4].innerHTML).to.eq('WA');
                });

                it('should change if the contacts collection changes', function() {
                    // when the contacts collection is changed to include fewer unique state, the states dropdown should
                    // update accordingly
                    vm.contacts = contacts.slice(0, 2);
                    scope.$digest();
                    var els = element.find('.contact-filters .select-state option');
                    expect(els.length).to.eq(3);
                    expect(els[1].innerHTML).to.eq('AR');
                    expect(els[2].innerHTML).to.eq('CO');
                });
            });

        });

    });
})();
