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

        jqueryCheck: 'if (!jQuery) { throw new Error(\"Graceful-web-ui requires jQuery\") }\n\n',

        clean: {
            dist: ['dist']
        },

        concat: {
            options: {
                banner: '<%= banner %><%= jqueryCheck %>',
                stripBanners: false
            },
            grace: {
                src: ['js/helper.js', 'js/nav.js', 'js/tab.js', 'js/collapse.js', 'js/popup.js', 'js/panel.js', 'js/ie-patch.js'],
                dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        recess: {
            options: {
                compile: true
            },
            grace: {
                files: {
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>.css': ['less/grace.less'],
                    'demo/css/index.css': ['demo/less/index.less'],
                    'demo/css/lib/prettify.css': ['demo/less/prettify.less']
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css': ['less/grace.less']
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            grace: {
                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.grace.dest %>']
                }
            }
        },

        copy: {
            demo: {
                files: [
                    {
                        'demo/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css',
                        'demo/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js',
                        'demo/js/lib/jquery.min.js': 'bower_components/jquery/jquery.min.js',
                        'demo/js/lib/prettify.js': 'bower_components/google-code-prettify/src/prettify.js'
                    },
                    {expand: true, src: ['assets/**'], dest: 'demo'}
                ]
            },
            test: {
                files: {
                    'js/tests/vendor/lib/jquery.js': 'bower_components/jquery/jquery.js',
                    'js/tests/vendor/lib/qunit.js': 'bower_components/qunit/qunit//qunit.js',
                    'js/tests/vendor/lib/qunit.css': 'bower_components/qunit/qunit/qunit.css'
                }
            },
            dist_assets: {
                files: [
                    {expand: true, src: ['assets/graceful-web-ui/**'], dest: 'dist'}
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
            options: {
                inject: 'js/tests/unit/phantom.js'
            },
            files: ['js/tests/*.html']
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
                tasks: ['recess', 'copy:demo']
            }
        },

        bower: {
            install: {
                options: {
                    copy: false,
                    cleanTargetDir: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    // Test task.
    grunt.registerTask('test', ['bower:install', 'copy:test', 'jshint', 'qunit']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['recess']);

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);

    // Assets distribution task.
    grunt.registerTask('dist-assets', ['copy:dist_assets']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'dist-assets']);

    // Demo distribution task.
    grunt.registerTask('dist-demo', ['dist', 'bower', 'copy:demo']);

    // Start local server for demo
    grunt.registerTask('s', ['dist-demo', 'connect']);

    // Default task(s).
    grunt.registerTask('default', ['dist-demo']);

};