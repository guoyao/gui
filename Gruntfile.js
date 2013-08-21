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
                src: ['js/helper.js', 'js/nav.js', 'js/tab.js', 'js/collapse.js', 'js/popup.js', 'js/slider.js', 'js/placeholder.js', 'js/panel.js', 'js/ie-patch.js'],
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
                    'demo/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css',
                    'demo/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
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

    // Test task.
    grunt.registerTask('test', ['jshint', 'qunit']);

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['recess']);

    // demo distribution task.
    grunt.registerTask('dist-demo', ['copy:demo']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);

    // start local server for demo
    grunt.registerTask('s', ['dist', 'dist-demo', 'connect']);

    // Default task(s).
    grunt.registerTask('default', ['dist', 'dist-demo']);

};