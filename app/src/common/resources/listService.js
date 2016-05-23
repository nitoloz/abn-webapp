angular.module('abnWebapp')
    .factory('listService', listService);

/* @ngInject */
function listService($q) {
    return {
        getRows: function() {
            var list = [
                {
                    name: 'First ABN',
                    verticesCount: 10,
                    dateCreated: 1463994210104
                },
                {
                    name: 'Second ABN',
                    verticesCount: 20,
                    dateCreated: 1463754302149
                },
                {
                    name: 'Third ABN',
                    verticesCount: 5,
                    dateCreated: 1463754011080
                },
                {
                    name: 'Fourth ABN',
                    verticesCount: 15,
                    dateCreated: 1463753844174
                }
            ];

            return $q.resolve(list);
        }
    };
}
