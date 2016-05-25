angular.module('abnWebapp')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('edit', {
                url: '/edit',
                views: {
                    "main": {
                        templateUrl: 'abn/edit/abn-edit.html',
                        controller: 'ABNEdit',
                        controllerAs: 'abnCtrl'
                    }
                },
                params: {selectedId: null},
                resolve: {
                    abn: function ($stateParams, abnService) {
                        return abnService.getDetails($stateParams.selectedId);
                    }
                }
            });
    }])
    .controller('ABNEdit', ABNEdit);

/* @ngInject */
function ABNEdit(abn) {
    var self = this;

    var init = function () {
        self.abn = abn;
    };

    init();
}
