module.exports = function (grunt) {
    return {
        pkg: grunt.file.readJSON("./package.json"),

        meta: {
            banner: '/**\n' +
            ' * <%= pkg.name %> - v<%= grunt.option(pkg.releaseVersion) %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n'
        },

        clean: [
            '<%= build_dir %>',
            '<%= bin_dir %>'
        ],

        copy: {
            build_app_assets: {
                files: [
                    {
                        expand: true,
                        src: ['<%= app_files.assets %>'],
                        dest: '<%= build_dir %>/assets/',
                        flatten: true
                    }
                ]
            },
            build_vendor_fonts: {
                files: [
                    {
                        expand: true,
                        src: ['<%= vendor_files.fonts %>'],
                        dest: '<%= build_dir %>/assets/fonts',
                        flatten: true
                    }
                ]
            },
            build_app_fonts: {
                files: [
                    {
                        expand: true,
                        src: ['<%= app_files.fonts %>'],
                        dest: '<%= build_dir %>/assets/fonts',
                        flatten: true
                    }
                ]
            },
            build_app_js: {
                files: [
                    {
                        expand: true,
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_dir %>/'
                    }
                ]
            },
            build_app_json: {
                files: [
                    {
                        expand: true,
                        src: ['<%= app_files.json %>'],
                        dest: '<%= build_dir %>/i18n/',
                        flatten: true
                    }
                ]
            },
            build_vendor_js: {
                files: [
                    {
                        expand: true,
                        src: ['<%= vendor_files.js.normal %>'],
                        dest: '<%= build_dir %>'
                    }
                ]
            },
            build_vendor_img: {
                files: [
                    {
                        expand: true,
                        src: ['<%= vendor_files.img %>'],
                        dest: '<%= build_dir %>/'
                    }
                ]
            },
            bin_assets: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= build_dir %>/assets',
                        src: ['**'],
                        dest: '<%= bin_dir %>/assets'
                    },
                    {
                        expand: true,
                        cwd: '<%= build_dir %>',
                        src: ['vendor/**/*.css'],
                        dest: '<%= bin_dir %>/'
                    }
                ]
            },
            bin_json: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= build_dir %>/i18n',
                        src: ['**'],
                        dest: '<%= bin_dir %>/i18n'
                    }
                ]
            },
            bin_vendor_js: {
                files: [
                    {
                        expand: true,
                        src: ['<%= vendor_files.js.minified %>', '<%= vendor_files.js.toMinify %>'],
                        dest: '<%= build_dir %>/'
                    }
                ]
            },
            bin_vendor_img: {
                files: [
                    {
                        expand: true,
                        src: ['<%= vendor_files.img %>'],
                        dest: '<%= bin_dir %>/'
                    }
                ]
            }
        },

        concat: {
            build_css: {
                src: [
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.releaseVersion %>.css'
                ],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.releaseVersion %>.css'
            },
            bin_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js.minified %>',
                    '<%= vendor_files.js.toMinify %>',
                    'grunt/module.prefix',
                    '<%= build_dir %>/app/**/*-module.js',
                    '<%= build_dir %>/app/**/*.js',
                    '<%= html2js.app.dest %>',
                    'grunt/module.suffix'
                ],
                dest: '<%= bin_dir %>/assets/<%= pkg.name %>-<%= pkg.releaseVersion %>.js'
            }
        },

        ngAnnotate: {
            bin: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= build_dir %>',
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_dir %>'
                    }
                ]
            }
        },

        uglify: {
            bin: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= build_dir %>',
                    src: ['app/**/*.js', '<%= vendor_files.js.toMinify %>'],
                    dest: '<%= build_dir %>'
                }]
            }
        },

        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.releaseVersion %>.css': '<%= app_files.less %>'
                }
            },
            bin: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.releaseVersion %>.css': '<%= app_files.less %>'
                },
                options: {
                    cleancss: true,
                    compress: true
                }
            }
        },

        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },

        html2js: {
            app: {
                options: {
                    base: 'app/src'
                },
                src: ['<%= app_files.templates %>'],
                dest: '<%= build_dir %>/app/src/templates-app.js'
            }
        },

        karma: {
            options: {
                configFile: '<%= build_dir %>/karma-unit.js'
            },
            unit: {
                port: 9019,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js.normal %>',
                    '<%= build_dir %>/app/**/*-module.js',
                    '<%= build_dir %>/app/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.releaseVersion %>.css'
                ]
            },
            bin: {
                dir: '<%= bin_dir %>',
                src: [
                    '<%= concat.build_css.dest %>',
                    '<%= concat.bin_js.dest %>'
                ]
            }
        },

        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= html2js.app.dest %>',
                    '<%= test_files.js %>'
                ]
            }
        },

        delta: {

            options: {
                livereload: true
            },

            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            js: {
                files: [
                    '<%= app_files.js %>',
                ],
                tasks: ['jshint:src', /* 'karma:unit:run',*/ 'copy:build_app_js', 'copy:build_vendor_js']
            },

            json: {
                files: [
                    '<%= app_files.json %>'
                ],
                tasks: ['copy:build_app_json']
            },

            assets: {
                files: [
                    'app/assets/**/*'
                ],
                tasks: ['copy:build_app_assets']
            },

            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            templates: {
                files: [
                    '<%= app_files.templates %>'
                ],
                tasks: ['html2js']
            },

            less: {
                files: ['app/**/*.less'],
                tasks: ['less:build']
            },

            jsunit: {
                files: [
                    '<%= app_files.jsunit %>'
                ],
                tasks: ['jshint:test', 'karma:unit:run'],
                options: {
                    livereload: false
                }
            }
        },

        ngconstant: {
            default: {
                options: {
                    name: 'config',
                    dest: '<%= build_dir %>/app/src/config.js',
                    constants: {
                        apiRoot: 'http://localhost:8080/api/',
                    }
                }
            }
        },
    }
};
