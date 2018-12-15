'use strict'
var test = require('tape').test
var Buffer = require('safe-buffer').Buffer
var varuint = require('../')

var fixtures = require('./fixtures')

fixtures.valid.forEach(function (fixture, i) {
  test('valid encode #' + (i + 1), function (t) {
    t.same(varuint.encode(fixture.dec).toString('hex'), fixture.hex)
    t.same(varuint.encode.bytes, fixture.hex.length / 2)
    t.end()
  })

  test('valid decode #' + (i + 1), function (t) {
    t.same(varuint.decode(Buffer.from(fixture.hex, 'hex')), fixture.dec)
    t.same(varuint.decode.bytes, fixture.hex.length / 2)
    t.end()
  })

  test('valid encodingLength #' + (i + 1), function (t) {
    t.same(varuint.encodingLength(fixture.dec), fixture.hex.length / 2)
    t.end()
  })
})

fixtures.invalid.forEach(function (fixture, i) {
  test('invalid encode #' + (i + 1), function (t) {
    t.throws(function () {
      varuint.encode(fixture.dec)
    }, new RegExp(fixture.msg))
    t.end()
  })

  test('invalid encodingLength #' + (i + 1), function (t) {
    t.throws(function () {
      varuint.encodingLength(fixture.dec)
    }, new RegExp(fixture.msg))
    t.end()
  })

  if (fixture.hex) {
    test('invalid decode #' + (i + 1), function (t) {
      t.throws(function () {
        t.decode(varuint.decode(Buffer.from(fixture.hex, 'hex')))
      }, new RegExp(fixture.msg))
      t.end()
    })
  }
})

test('encode', function (t) {
  t.test('write to buffer with offset', function (t) {
    var buffer = Buffer.from([0x00, 0x00])
    t.same(varuint.encode(0xfc, buffer, 1).toString('hex'), '00fc')
    t.same(varuint.encode.bytes, 1)
    t.end()
  })

  t.test('should be a buffer', function (t) {
    t.throws(function () {
      varuint.encode(0, [])
    }, new TypeError('buffer must be a Buffer instance'))
    t.end()
  })

  t.end()
})

test('decode', function (t) {
  t.test('read from buffer with offset', function (t) {
    var buffer = Buffer.from([0x00, 0xfc])
    t.same(varuint.decode(buffer, 1), 0xfc)
    t.same(varuint.decode.bytes, 1)
    t.end()
  })

  t.test('should be a buffer', function (t) {
    t.throws(function () {
      varuint.decode([])
    }, new TypeError('buffer must be a Buffer instance'))
    t.end()
  })

  t.end()
})
