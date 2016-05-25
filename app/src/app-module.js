angular.module('abnWebapp', [
        'templates-app',
        'pascalprecht.translate',
        'ui.router',
        'smart-table'
    ])
    .config(config)
    .controller('AppCtrl', AppCtrl);

/* @ngInject */
function config($translateProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/list');
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
}

/* @ngInject */
function AppCtrl() {
    //TODO: Redactor to service when API for auth will done
    this.principal = {
        identity: {
            name: 'Andrey Zolotin'
        },
        isAuthenticated: function() {
            return true;
        },
        signOut: angular.noop
    };
}