/**
 * Author: guoyao
 * Time: 07-31-2013 18:03
 * Blog: http://www.guoyao.me
 */

module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            '* <%= pkg.name %>.js v<%= pkg.version %> by @guoyao\n' +
            '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '* <%= pkg.description %>\n' +
            '* <%= pkg.homepage %>\n' +
            '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            '*/\n',

        jqueryCheck: 'if (!jQuery) { throw new Error(\"GUI requires jQuery\") }\n\n',

        clean: {
            dist: ['dist']
        },

        concat: {
            options: {
                banner: '<%= banner %><%= jqueryCheck %>',
                stripBanners: false
            },
            gui: {
                src: ['js/helper.js', 'js/nav.js', 'js/tab.js', 'js/collapse.js', 'js/popup.js', 'js/slider.js', 'js/placeholder.js', 'js/button.js', 'js/datepicker.js', 'js/button-bar.js', 'js/affix.js', 'js/carousel.js', 'js/breadcrumb.js', 'js/splitter.js', 'js/tooltip.js','js/autocomplete.js', 'js/dropdown.js', 'js/ie-patch.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        recess: {
            options: {
                compile: true
            },
            gui: {
                files: {
                    'dist/css/<%= pkg.name %>.css': ['less/gui.less'],
                    'demo_template/css/index.css': ['demo_template/less/index.less'],
                    'demo_template/css/lib/prettify.css': ['demo_template/less/prettify.less']
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'dist/css/<%= pkg.name %>.min.css': ['less/gui.less']
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            gui: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.gui.dest %>']
                }
            }
        },

        copy: {
            demo_template: {
                files: [
                    {
                        'demo_template/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.min.css',
                        'demo_template/js/lib/<%= pkg.name %>.js': 'dist/js/<%= pkg.name %>.min.js',
                        'demo_template/js/lib/jquery.js': 'bower_components/jquery/jquery.min.js',
                        'demo_template/js/lib/prettify.js': 'bower_components/google-code-prettify/src/prettify.js',
                        'demo_template/js/lib/require.js': 'bower_components/requirejs/require.js'
                    },
                    {expand: true, src: ['assets/**'], dest: 'demo_template'}
                ]
            },
            test: {
                files: [
                    {
                        'js/tests/vendor/lib/jquery.js': 'bower_components/jquery/jquery.js',
                        'js/tests/vendor/lib/qunit.js': 'bower_components/qunit/qunit//qunit.js',
                        'js/tests/vendor/lib/qunit.css': 'bower_components/qunit/qunit/qunit.css',
                        'js/tests/vendor/lib/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.min.css'
                    },
                    {expand: true, src: ['assets/gui/**'], dest: 'js/tests/vendor'}
                ]
            },
            dist_assets: {
                files: [
                    {expand: true, src: ['assets/gui/**'], dest: 'dist'}
                ]
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'demo',
                    keepalive: true
                }
            }
        },

        watch: {
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
            recess: {
                files: 'less/*.less',
                tasks: ['recess', 'copy:demo_template']
            }
        },

        bower: {
            install: {
                options: {
                    copy: false,
                    cleanTargetDir: true
                }
            }
        },

        requirejs: {
            options: grunt.file.readJSON('demo_template/optimizer.json'),
            demo_optimize: {
                options: {
                    fileExclusionRegExp: /less|optimizer\.json/
                }
            }
        },

        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['js/*.js']
            },
            test: {
                src: ['js/tests/unit/*.js']
            }
        },

        qunit: {
            phantom: {
                options: {
                    inject: 'js/tests/unit/phantom.js',
                    coverage: {
                        src: ['js/*.js'],
                        instrumentedFiles: "temp/",
                        lcovReport: "report/"
                    }
                },
                src: ['js/tests/*.html']
            },
            coverage: {
                options: {
                    coverage: {
                        src: ['js/*.js'],
                        instrumentedFiles: "temp/",
                        lcovReport: "report/"
                    }
                },
                src: ['js/tests/*.html']
            }
        },

        shell: {
            coverall: {
                command: 'node_modules/coveralls/bin/coveralls.js <report/lcov.info'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-qunit-istanbul');
    grunt.loadNpmTasks('grunt-shell');

    // Test task.
    grunt.registerTask('test', ['bower:install', 'recess:min', 'copy:test', 'jshint', 'qunit', 'shell:coverall']);

    // generate coverage report after tests
//    grunt.event.on('qunit.done', function () {
//        grunt.task.run('shell:coverall');
//    });

    // CSS distribution task.
    grunt.registerTask('dist-css', ['recess']);

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);

    // Assets distribution task.
    grunt.registerTask('dist-assets', ['copy:dist_assets']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'dist-assets']);

    // Demo distribution task.
    grunt.registerTask('dist-demo', ['dist', 'bower', 'copy:demo_template', 'requirejs:demo_optimize']);

    // Start local server for demo
    grunt.registerTask('s', ['dist-demo', 'connect']);

    // Default task(s).
    grunt.registerTask('default', ['dist']);

};