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
                src: ['js/helper.js', 'js/nav.js', 'js/tab.js', 'js/collapse.js', 'js/popup.js',  'js/panel.js', 'js/ie-patch.js'],
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
                    'demo/css/index.css': ['demo/less/index.less']
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
                files: {
                    'demo/js/lib/jquery.min.js': 'lib/jquery/jquery.min.js',
                    'demo/css/lib/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css',
                    'demo/js/lib/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
                }
            },
            test: {
                files: {
                    'js/tests/vendor/lib/jquery.js': 'lib/jquery/jquery.js',
                    'js/tests/vendor/lib/qunit.js': 'lib/qunit/qunit//qunit.js',
                    'js/tests/vendor/lib/qunit.css': 'lib/qunit/qunit/qunit.css'
                }
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
                    cleanBowerDir: true
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

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['recess']);

    // demo distribution task.
    grunt.registerTask('dist-demo', ['bower', 'copy:demo']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);

    // start local server for demo
    grunt.registerTask('s', ['dist', 'dist-demo', 'connect']);

    // Default task(s).
    grunt.registerTask('default', ['dist', 'dist-demo']);

};