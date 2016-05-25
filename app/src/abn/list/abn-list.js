angular.module('abnWebapp')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('list', {
                url: '/list',
                views: {
                    "main": {
                        templateUrl: 'abn/list/abn-list.html',
                        controller: 'ABNList',
                        controllerAs: 'list'
                    }
                },
                resolve: {
                    rows: function (abnService) {
                        return abnService.getList();
                    }
                }
            });
    }])
    .controller('ABNList', ABNList);

/* @ngInject */
function ABNList($filter, $state, rows, abnColumns) {
    var self = this;

    var DEFAULT_SORT_COLUMN = 'name';

    var init = function () {
        self.columns = abnColumns;
        self.rows = rows;
        self.currentSort = {};

        self.getColumnValue = getColumnValue;
        self.getSortColumnClass = getSortColumnClass;
        self.openABN = openABN;
        self.sort = sort;

        sort(DEFAULT_SORT_COLUMN);
    };

    init();

    function openABN() {
        $state.go('edit');
    }

    function getSortColumnClass(column) {
        if (column.id === self.currentSort.predicate) {
            return self.currentSort.reverse ? 'sort-desc' : 'sort-asc';
        }
        return null;
    }

    function getColumnValue(row, column) {
        switch (column.id) {
            case 'dateCreated':
                return $filter('date')(row.dateCreated);
            default:
                return row[column.id];
        }
    }

    function sort(columnId) {
        if (columnId === self.currentSort.predicate) {
            self.currentSort.reverse = !self.currentSort.reverse;
        } else {
            self.currentSort = {
                predicate: columnId,
                reverse: false
            };
        }

        var order = self.currentSort.reverse ? 'desc' : 'asc';
        self.rows = _.orderBy(self.rows, columnId, order);
    }
}
