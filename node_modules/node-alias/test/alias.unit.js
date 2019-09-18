(function() {
  'use strict';

  var CHALK_RESULT = '_CHALK_RESULT_';

  var _ = require('lodash');
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var expect = chai.expect;
  var path = require('path');
  var requireSubvert = require('require-subvert')(__dirname);

  chai.use(sinonChai);

  var sandbox = sinon.sandbox.create();
  var short = 'test';
  var shortWithSub = 'test sub';


  var fullpath = path.resolve(__dirname);
  var stubs = {};
  stubs[fullpath + '/' + short] = {};
  stubs[fullpath + '/' + _.kebabCase(shortWithSub)] = {};

  describe('alias (exported module)', function() {
    var alias, chalk;

    beforeEach(function() {
      chalk = {
        bold: {
          blue: sandbox.stub().returns(CHALK_RESULT),
          red: sandbox.stub().returns(CHALK_RESULT)
        }
      };

      requireSubvert.subvert('chalk', chalk);
      requireSubvert.require('../index');
      alias = require('../index');
    });

    afterEach(function() {
      sandbox.restore();
    });

    describe('when the input data is valid', function() {
      var _alias;

      beforeEach(function() {
        _alias = _.partial(alias, short, __dirname);

        sandbox.spy(process.stdout, 'write');
        sandbox.spy(console, 'log');
      });

      it('if options.message is false should log nothing', function() {
        _alias({message: false});
        expect(process.stdout.write).not.to.have.been.called;
        expect(console.log).not.to.have.been.called;
      });

      describe('if options.message is not false', function() {
        it('should use the provided color if it exists', function() {
          var color = 'red';

          quiet([
            _.partial(_alias, {color: color}),
            _.partial(expectInfo, null, color)
          ]);
        });

        it('should print the provided message if it is a string', function() {
          var message = '_MESSAGE_';

          quiet([
            _.partial(_alias, {message: message}),
            _.partial(expectInfo, message)
          ]);
        });

        it('should print the default message if one is not provided', function() {
          quiet([_alias, expectInfo]);
        });

        it('should print the default message options.message is `true`', function() {
          quiet([_.partial(_alias, {message: true}), expectInfo]);
        });

        it('should print a blank line', function() {
          quiet([_alias]);
          expect(console.log).to.have.been.calledWith();
        });

        it('should support git style sub-commands', function() {
          var sub = _.partial(alias, shortWithSub, __dirname);
          quiet([sub]);
          expect(_.partial(quiet, [])).not.to.throw();
        });
      });
    });

    describe('when the input data is not valid', function() {
      it('should throw an error if `short` is not provided', function() {
        expect(alias).to.throw('Missing `short`');
      });

      it('should throw an error if `shortPath` is not provided', function() {
        expect(_.partial(alias, short)).to.throw('Missing `shortPath`');
      });
    });

    // Make the expectations each time to validate they don't change when options change
    function expectInfo(message, color) {
      message = message || 'You can also use ' + CHALK_RESULT + ' as an alias';
      color = color || 'blue';

      expect(chalk.bold[color]).to.have.been.calledWith('[INFO]:');
      expect(process.stdout.write).to.have.been.calledWith(CHALK_RESULT + ' ');
      expect(process.stdout.write).to.have.been.calledWith(message);
    }

    // needed because we have to be careful when to suppress stdout as to not suppress errors / test output
    function quiet(funcs) {
      var restore = process.stdout.write;
      process.stdout.write = sandbox.spy();

      _.each(funcs, function(func) {
        func();
      });

      process.stdout.write = restore;
    }
  });
})();
