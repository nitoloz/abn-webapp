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
function ABNList($filter, rows, abnService, abnColumns) {
    var self = this;

    var init = function () {
        self.columns = abnColumns;
        self.rows = rows;

        self.callServer = callServer;
        self.getColumnValue = getColumnValue;
    };

    init();

    function getColumnValue(row, column) {
        switch (column.id) {
            case 'dateCreated':
                return $filter('date')(row.dateCreated);
            default:
                return row[column.id];
        }
    }

    function callServer(tableState, ctrl) {
        abnService.getList().then(function () {
            self.rows = rows;
        });
    }
}
