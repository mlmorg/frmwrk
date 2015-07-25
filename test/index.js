'use strict';
var test = require('tape');

var frmwrk = require('../');

test('frmwrk is a function', function t(assert) {
  assert.equal(typeof frmwrk, 'function');

  assert.end();
});

test('frmwrk is not implemented', function t(assert) {
  assert.throws(function throwIt() {
    frmwrk();
  }, /Not Implemented/);

  assert.end();
});
