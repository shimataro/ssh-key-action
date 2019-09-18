/**
 * @file index.js
 *
 * Alias the long version of a command to the short version, with optional messaging.
 */
(function() {
  'use strict';

  var _ = require('lodash');
  var chalk = require('chalk');
  var path = require('path');

  /**
   * Require the [short].js file, and optionally message the user.
   *
   * @param {string} short - The short name for the executable. Can include sub-commands, i.e. `var short = "[command] [foo]"`. If sub-commands
   *                         are used, kebab-case is the assumed format of the file. Sub-command functionality works well with `commander`.
   * @param {string} shortPath - The path where the `short` command file actually exists. Pass `__dirname` to use the same directory (i.e. when
   *                             using `Git style sub-commands` to pair with commander.js.
   * @param {object} [options] - Additional options to customize the behavior.
   * @param {mixed} [options.message] - Can be `true`, `false`, or a custom message. If set to `true`, displays a default message. Defaults to `true`.
   * @param {string} [options.color] - Specify a custom color. Comes from `chalk`.
   *
   * @see https://github.com/tj/commander.js
   * @see https://github.com/chalk/chalk
   */
  function alias(short, shortPath, options) {
    if (!short) {
      throw new Error('Missing `short`');
    }

    if (!shortPath) {
      throw new Error('Missing `shortPath`');
    }

    if (_.get(options, 'message') !== false) {
      options = options || {};
      var color = options.color || 'blue';

      process.stdout.write(chalk.bold[color]('[INFO]:') + ' ');

      if (_.isString(options.message)) {
        process.stdout.write(options.message);
      } else {
        process.stdout.write('You can also use ' + chalk.bold[color](short) + ' as an alias');
      }

      console.log();
    }

    require(path.resolve(shortPath, _.kebabCase(short)));
  }

  module.exports = alias;
})();
