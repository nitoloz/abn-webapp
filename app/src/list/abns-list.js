angular.module('abnWebapp')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('list', {
                url: '/list',
                views: {
                    "main": {
                        templateUrl: 'list/abns-list.html',
                        controller: 'ABNList',
                        controllerAs: 'list'
                    }
                },
                resolve: {
                    rows: function(listService) {
                        return listService.getRows();
                    }
                }
            });
    }])
    .controller('ABNList', ABNList);

/* @ngInject */
function ABNList($filter, rows, listService, abnColumns) {
    var self = this;

    var init = function() {
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
        listService.getRows().then(function() {
            self.rows = rows;
        });
    }
}
