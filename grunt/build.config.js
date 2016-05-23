module.exports = {

    build_dir: 'build',
    bin_dir: 'bin',

    app_files: {
        js: ['app/src/**/*.js', '!app/src/**/*.spec.js'],
        json: ['app/i18n/*.json'],
        jsunit: ['app/**/*.spec.js'],

        assets: ['app/assets/*'],

        templates: ['app/src/**/*.html', '!app/index.html'],
        html: ['app/index.html'],

        less: 'app/less/main.less',

        fonts: 'app/less/fonts/*'
    },

    test_files: {
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },

    vendor_files: {
        js: {
            normal: [
                'vendor/angular/angular.js',
                'vendor/angular-loader/angular-loader.js',
                'vendor/angular-notify/dist/angular-notify.js',
                'vendor/angular-smart-table/dist/smart-table.js',
                'vendor/angular-translate/angular-translate.js',
                'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'vendor/angular-translate-once/src/translate-once.js',
                'vendor/angular-ui-router/release/angular-ui-router.js',
                'vendor/jquery/dist/jquery.js',
                'vendor/lodash/lodash.js'
            ],
            minified: [
                'vendor/angular/angular.min.js',
                'vendor/angular-loader/angular-loader.min.js',
                'vendor/angular-notify/dist/angular-notify.min.js',
                'vendor/angular-smart-table/dist/smart-table.min.js',
                'vendor/angular-translate/angular-translate.min.js',
                'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
                'vendor/angular-ui-router/release/angular-ui-router.min.js',
                'vendor/jquery/dist/jquery.min.js',
                'vendor/lodash/lodash.min.js'
            ],
            toMinify: [
                'vendor/angular-translate-once/src/translate-once.js'
            ]
        },
        img: [
        ],
        css: {
        },
        fonts: [
        ]
    }
};
