# [GUI](http://gui.guoyao.me)
[![Build Status](https://api.travis-ci.org/guoyao/gui.png)](http://travis-ci.org/guoyao/gui)
[![Dependency Status](https://gemnasium.com/guoyao/graceful-web-ui.png)](https://gemnasium.com/guoyao/graceful-web-ui)
[![Coverage Status](https://coveralls.io/repos/guoyao/graceful-web-ui/badge.png?branch=dev)](https://coveralls.io/r/guoyao/graceful-web-ui?branch=dev)

supported browser: ie6+ firefox4+ safari chrome and so on.

project homepage: [http://www.gui.guoyao.me/](http://www.gui.guoyao.me/)

including source code and demo for
[*GUI*](http://www.gui.guoyao.me/)
by [guoyao](http://www.guoyao.me/).




# [GUI v0.1.0](http://gui.guoyao.me)

GUI is a graceful, cross browser, and powerful front-end framework for faster and easier web development, created and maintained by [Guoyao Wu](http://guoyao.me).

To get started, check out [http://gui.guoyao.me](http://gui.guoyao.me)!



## Quick start

Two quick start options are available:

* [Download the latest devlopment version](https://github.com/guoyao/gui/archive/dev.zip).
* Clone the repo: `git clone git://github.com/guoyao/gui.git`.

Read the [Getting Started page](http://gui.guoyao.me/) for information on the framework contents, templates and examples, and more.



## Bugs and feature requests

Have a bug or a feature request? [Please open a new issue](https://github.com/guoyao/gui/issues). Before opening any issue, please search for existing issues and read the [Issue Guidelines](https://github.com/necolas/issue-guidelines), written by [Nicolas Gallagher](https://github.com/necolas/).



## Documentation

Please check [Getting Started page](http://gui.guoyao.me/) for information, no standard documentation now.



## Compiling CSS and JavaScript

GUI uses [Grunt](http://gruntjs.com/) with convenient methods for working with the framework. It's how we compile our code, run tests, and more. To use it, install the required dependencies as directed and then run some Grunt commands.

### Install Grunt

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Install the [necessary local dependencies](package.json) via `npm install`

When completed, you'll be able to run the various Grunt commands provided from the command line.

**Unfamiliar with `npm`? Don't have node installed?** That's a-okay. npm stands for [node packaged modules](http://npmjs.org/) and is a way to manage development dependencies through node.js. [Download and install node.js](http://nodejs.org/download/) before proceeding.

### Available Grunt commands

#### Build - `grunt`
Run `grunt` to compile the CSS and JavaScript into `/dist`. **Requires recess and uglify-js.**, and compile the resources for demo.

#### Only compile CSS and JavaScript - `grunt dist`
`grunt dist` creates the `/dist` directory with compiled files. **Requires recess and uglify-js.**

#### Tests - `grunt test`
Runs jshint and qunit tests headlessly in [phantomjs](http://code.google.com/p/phantomjs/) (used for ci). **Requires phantomjs.**

#### Watch - `grunt watch`
This is a convenience method for watching just Less files and automatically building them whenever you save.

#### Run local server for demo - `grunt s`
`grunt s` will start a local server for demo

### Troubleshooting dependencies

Should you encounter problems with installing dependencies or running Grunt commands, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.



## Contributing

Please read through our guidelines for contributing to GUI. Included are directions for opening issues, coding standards, and notes on development.

More over, if your pull request contains JavaScript patches or features, you must include relevant unit tests.



## Community

Keep track of development and community news.

* Follow [@wuguoyao on Twitter](http://twitter.com/wuguoyao).
* Read and subscribe to the [The Official Blog](http://guoyao.me).



## Versioning

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, GUI will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit [http://semver.org/](http://semver.org/).



## Authors

**Guoyao Wu**

+ [https://twitter.com/wuguoyao](https://twitter.com/wuguoyao)
+ [http://github.com/guoyao](http://github.com/guoyao)
+ [http://guoyao.me](http://guoyao.me)



## Major Contributors

**Alfredzh**

+ [http://github.com/alfredzh](http://github.com/alfredzh)

**Redstarter**

+ [http://github.com/redstarter](http://github.com/redstarter)



## Copyright and license

Copyright 2013 Guoyao Wu under [the Apache 2.0 license](LICENSE).
