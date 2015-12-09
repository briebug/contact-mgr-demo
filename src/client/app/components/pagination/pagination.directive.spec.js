/* jshint -W117, -W101 */
/* jscs:disable maximumLineLength */
(function() {
    'use strict';

    describe('cmPagination', function() {
        var scope, vm, element, i, items;

        items = [];
        for (i = 1; i <= 23; i++) {
            items.push({name:'' + i});
        }

        beforeEach(function() {
            bard.appModule('app.components');
            bard.inject(
                '$compile',
                '$rootScope'
            );
        });

        beforeEach(function() {
            scope = $rootScope.$new();
            scope.currentPage = 1;
            scope.itemsPerPage = 5;
            scope.itemCount = items.length;
            var template = '<cm-pagination current-page="currentPage" items-per-page="itemsPerPage"' +
                ' item-count="itemCount"></cm-pagination>';

            element = $compile(template)(scope);
            scope.$digest();
            vm = element.controller('cmPagination');
        });

        it('Opens the pagination directive', function() {
            expect(element).to.exist();
            expect(vm).to.exist();
        });

        describe('Unit Tests', function() {

            describe('function init()', function() {
                it('should set itemsPerPage to vm', function() {
                    vm.init();
                    expect(vm.itemsPerPage).to.eq(5);
                });

                it('should set pageCount to vm', function() {
                    vm.init();
                    expect(vm.pageCount).to.eq(1);
                });
            });

            describe('function range()', function() {
                it('should return the correct array of page numbers', function() {
                    var val = vm.range();
                    expect(val.length).to.eq(5);
                    if (val.length === 5) {
                        expect(val[0]).to.eq(1);
                        expect(val[4]).to.eq(5);
                    }
                });
            });

            describe('function setPage(pageNumber)', function() {
                it('should correctly set the current page', function() {
                    vm.setPage(2);
                    expect(vm.currentPage).to.eq(2);
                    vm.setPage(4);
                    expect(vm.currentPage).to.eq(4);
                });
            });

            describe('function prevPage()', function() {
                it('should set the current page to the previous one', function() {
                    vm.currentPage = 4;
                    vm.prevPage();
                    expect(vm.currentPage).to.eq(3);
                });

                it('should not change the current page if already on the first page', function() {
                    vm.currentPage = 1;
                    vm.prevPage();
                    expect(vm.currentPage).to.eq(1);
                });
            });

            describe('function nextPage()', function() {
                it('should set the current page to the next one', function() {
                    vm.currentPage = 2;
                    vm.nextPage();
                    expect(vm.currentPage).to.eq(3);
                });

                it('should not change the current page if already on the last page', function() {
                    vm.currentPage = 5;
                    vm.nextPage();
                    expect(vm.currentPage).to.eq(5);
                });
            });

            describe('watches', function() {
                it('should change the page count if the items per page value is changed', function() {
                    vm.itemsPerPage = 10;
                    scope.$digest();
                    expect(vm.pageCount).to.eq(3);
                });

                it('should change the page count if the item count is changed', function() {
                    vm.itemCount = 10;
                    scope.$digest();
                    expect(vm.pageCount).to.eq(2);
                });

                it('should change the current page if it is no longer valid', function() {
                    vm.currentPage = 5;
                    vm.itemCount = 10;
                    scope.$digest();
                    expect(vm.currentPage).to.eq(2);
                });
            });

        });

        describe('Integration Tests', function() {

            describe('rendered view', function() {
                it('should display the correct number of pages', function() {
                    // check that we have 5 pages plus 'prev' and 'next'
                    var els = element.find('.pagination li');
                    expect(els.length).to.eq(7);
                    expect(els.eq(0).text().trim()).to.eq('« Prev');
                    expect(els.eq(3).text().trim()).to.eq('3');
                    expect(els.eq(6).text().trim()).to.eq('Next »');
                });

                it('should disable the "prev" link if current page is 1', function() {
                    // set the current page to the first one, then check that the 'prev' link is disabled
                    scope.currentPage = 1;
                    scope.$digest();
                    var el = element.find('.pagination li').eq(0);
                    expect(el.hasClass('disabled')).to.eq(true);
                });

                it('should disable the "next" link if current page is the last one', function() {
                    // set the current page to the last one, then check that the 'next' link is disabled
                    scope.currentPage = 5;
                    scope.$digest();
                    var el = element.find('.pagination li').eq(6);
                    expect(el.hasClass('disabled')).to.eq(true);
                });

                it('should change the current page if the "prev" link is clicked', function() {
                    // start on page 3, click the 'prev' link and then check that we end up on page 2
                    scope.currentPage = 3;
                    scope.$digest();
                    var el = element.find('.pagination li').eq(0).find('a');
                    el.triggerHandler('click');
                    expect(scope.currentPage).to.eq(2);
                });

                it('should change the current page if the "next" link is clicked', function() {
                    // start on page 3, click the 'next' link and then check that we end up on page 4
                    scope.currentPage = 3;
                    scope.$digest();
                    var el = element.find('.pagination li').eq(6).find('a');
                    el.triggerHandler('click');
                    expect(scope.currentPage).to.eq(4);
                });

                it('should not change the current page if the "prev" link is clicked when on the first page', function() {
                    // start on page 1, click the 'prev' link and then check that we're still on page 1
                    scope.currentPage = 1;
                    scope.$digest();
                    var el = element.find('.pagination li').eq(0).find('a');
                    el.triggerHandler('click');
                    expect(scope.currentPage).to.eq(1);
                });

                it('should not change the current page if the "next" link is clicked when on the last page', function() {
                    // start on page 5, click the 'prev' link and then check that we're still on page 5
                    scope.currentPage = 5;
                    scope.$digest();
                    var el = element.find('.pagination li').eq(6);
                    el.find('a').triggerHandler('click');
                    expect(scope.currentPage).to.eq(5);
                });

                it('should change the number of pages if item count is changed', function() {
                    // if we go from 23 to 13 items (and page size is 5), then we should have 3 pages instead of 5
                    scope.itemCount = items.slice(0, 12).length;
                    scope.$digest();
                    var els = element.find('.pagination .page');
                    expect(els.length).to.eq(3);
                });

                it('should change the number of pages if itemsPerPage is changed', function() {
                    // if we have 23 items and change the page size to 3, then we should have 8 pages
                    scope.itemsPerPage = '3';
                    scope.$digest();
                    var els = element.find('.pagination .page');
                    expect(els.length).to.eq(8);
                });
            });
        });

    });
})();
