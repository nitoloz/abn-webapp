angular.module('abnWebapp')
    .constant('abnColumns', [
        {
            id: 'name',
            title: 'NAME',
            sortable: true
        },
        {
            id: 'verticesCount',
            title: 'VERTICES_COUNT',
            sortable: true
        },
        {
            id: 'dateCreated',
            title: 'DATE_CREATED',
            sortable: true
        }
    ]);