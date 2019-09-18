var chai            = require('chai')
var should          = chai.should()
var chaiAsPromised  = require('chai-as-promised')
var BluebirdPromise = require('bluebird')
var requireNew      = require('require-new')
var spawn           = require('../index.js')

chai.use(chaiAsPromised)

describe('spawn-please', function() {

  it('should resolve', function () {
    return spawn('true')
  })

  it('should reject', function () {
    return spawn('false')
      .then(function () {
        return should.not.exist(true, 'should not resolve!')
      })
      .catch(function (err) {
        return should.exist(err)
      })
  })

  it('should allow errors to be ignored with rejectOnError:false', function () {
    return spawn('false', [], { rejectOnError: false })
  })

  it('should handle command-line arguments', function () {
    return spawn('printf', ['hello'])
      .then(function (output) {
        return output.should.equal('hello')
      })
  })

  it('should accept stdin', function () {
    return spawn('cat', [], 'test')
      .then(function (output) {
        return output.should.equal('test')
      })
  })

  it('should allow you to specify a custom Promise', function () {
    var spawn = requireNew('../index.js')
    spawn('true').should.not.be.an.instanceof(BluebirdPromise)
    spawn.Promise = BluebirdPromise
    spawn('true').should.be.an.instanceof(BluebirdPromise)
  })

  it('should accept options', function () {
    return Promise.all([
      spawn('pwd', [], 'test', { cwd: __dirname})
        .then(function (output) {
          return output.trim().should.equal(__dirname)
        }),
      // stdin should still be read
      spawn('cat', [], 'test', { cwd: __dirname})
        .then(function (output) {
          return output.should.equal('test')
        })
    ])
  })

  it('should accept options as the third argument', function () {
    return spawn('pwd', [], { cwd: __dirname})
      .then(function (output) {
        return output.trim().should.equal(__dirname)
      })
  })

})
