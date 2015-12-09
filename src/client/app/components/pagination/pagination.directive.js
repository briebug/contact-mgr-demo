(function() {
    'use strict';

    angular
        .module('app.components.pagination')
        .directive('cmPagination', pagination);

    function pagination() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/pagination/pagination.html',
            scope: {
                currentPage: '=',
                itemsPerPage: '=',
                itemCount: '='
            },
            controller: PaginationController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function PaginationController($scope) {
        var vm = this;

        vm.init = init;
        vm.range = range;
        vm.setPage = setPage;
        vm.prevPage = prevPage;
        vm.nextPage = nextPage;

        ////////////

        function init() {
            vm.itemsPerPage = vm.itemsPerPage || 10;
            vm.pageCount = 1;

            // watches for changes to the current page, items-per-page, or the number of items and updates
            // the pagination widget accordingly
            $scope.$watchCollection('[vm.currentPage, vm.itemsPerPage, vm.itemCount]', function() {
                vm.pageCount = Math.ceil(vm.itemCount / parseInt(vm.itemsPerPage, 10));
                if (vm.currentPage > vm.pageCount) {
                    vm.currentPage = vm.pageCount;
                }
            });
        }

        // returns an array of page numbers for the current page count
        function range() {
            var start, end, ret, i;

            ret = new Array(vm.pageCount);
            for (i = 0; i < vm.pageCount; i++) {
                ret[i] = i + 1;
            }
            return ret;
        }

        // sets the current page to the selected value
        function setPage(pageNumber) {
            vm.currentPage = pageNumber;
        }

        // sets the current page to the previous one
        function prevPage() {
            var p = vm.currentPage;
            if (p > 1) {
                vm.currentPage = p - 1;
            }
        }

        // sets the current page to the next one
        function nextPage() {
            var p = vm.currentPage;
            if (p < vm.pageCount) {
                vm.currentPage = p + 1;
            }
        }
    }

})();
