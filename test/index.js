'use strict';
var h = require('virtual-dom/h');
var makeRequest = require('test-server-request');
var test = require('tape');

var frmwrk = require('../');

test('default port', function t(assert) {
  var server = frmwrk().listen();

  server.once('listening', function onListen(err) {
    assert.ifError(err);

    assert.equal(server.address().port, 3000,
      'defaults the port to 3000');

    server.close();
    assert.end();
  });
});

test('default state', function t(assert) {
  var server = frmwrk(render).listen();

  makeRequest(server, {
    url: '/'
  }, function onResponse(err, res) {
    assert.ifError(err);
    server.close();
    assert.end();
  });

  function render(state) {
    assert.deepLooseEqual(state, {
      route: {
        url: '/'
      }
    }, 'sets the initial state correctly');
  }
});

test('main route', function t(assert) {
  var server = frmwrk(render).listen();

  makeRequest(server, {
    url: '/'
  }, function onResponse(err, res, body) {
    assert.ifError(err);

    assert.equal(res.statusCode, 200,
      'responds with a 200');
    assert.equal(res.headers['content-type'], 'text/html',
      'sets headers to text/html');
    assert.ok(body.indexOf('<!DOCTYPE html>') >= 0,
      'has the correct doctype');
    assert.ok(body.indexOf('<body') >= 0,
      'builds a layout');
    assert.ok(body.indexOf('<h1>Hello World</h1>') >= 0,
      'renders correctly');

    server.close();
    assert.end();
  });

  function render() {
    return h('h1', 'Hello World');
  }
});
