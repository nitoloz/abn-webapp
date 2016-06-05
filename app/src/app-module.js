angular.module('abnWebapp', [
        'templates-app',
        'abn-charts',
        'pascalprecht.translate',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(config)
    .controller('AppCtrl', AppCtrl);

/* @ngInject */
function config($translateProvider, $httpProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('ru');
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
        isAuthenticated: function () {
            return true;
        },
        signOut: angular.noop
    };
}