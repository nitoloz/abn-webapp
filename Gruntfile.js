module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var userConfig = require('./grunt/build.config.js');
    var taskConfig = require('./grunt/task.config.js')(grunt);
    grunt.config.init(grunt.util._.extend(taskConfig, userConfig));

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);

    grunt.registerTask('copyBuild', [
        'copy:build_app_assets',
        'copy:build_vendor_fonts',
        'copy:build_app_fonts',
        'copy:build_app_js',
        'copy:build_app_json',
        'copy:build_vendor_js',
        'copy:build_vendor_img',
    ]);

    grunt.registerTask('build', function(arg) {
        var ngconst = 'ngconstant:' + (arg || 'default');
        grunt.task.run([
            'clean',
            ngconst,
            'html2js',
            'jshint',
            'less:build',
            'copyBuild',
            'index:build'
        ]);
    });

    grunt.registerTask('copyBin', [
        'copy:bin_assets',
        'copy:bin_json',
        'copy:bin_vendor_js',
        'copy:bin_vendor_img'
    ]);

    grunt.registerTask('bin', [
        'build',
        'copyBin',
        'ngAnnotate',
        'uglify',
        'concat',
        'index:bin',
    ]);

    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('bin_dir') + ')\/', 'g');
        var files = this.filesSrc.map(function(file) {
            return file.replace(dirRE, '');
        });
        var jsFiles = filterForJS(files);
        var cssFiles = filterForCSS(files);

        grunt.file.copy('app/index.html', this.data.dir + '/index.html', {
            process: function(contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.releaseVersion')
                    }
                });
            }
        });
    });

    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
            process: function(contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

    function filterForJS(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/);
        });
    }

    function filterForCSS(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);
        });
    }
};
