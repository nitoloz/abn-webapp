angular.module('abnWebapp')
    .factory('abnService', abnService);

/* @ngInject */
function abnService($q) {
    return {
        getList: getList,
        getDetails: getDetails
    };
    function getList() {
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

    function getDetails() {
        var details = {
            name: 'First ABN',
            verticesCount: 10,
            dateCreated: 1463994210104,
            alphabet: ['x1', 'x2', 'x3']
        };

        return $q.resolve(details);
    }
}
