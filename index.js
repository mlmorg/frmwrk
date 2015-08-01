'use strict';
var extend = require('xtend');
var h = require('virtual-dom/h');
var http = require('http');
var toHtml = require('vdom-to-html');

module.exports = frmwrk;

function frmwrk(render, options) {
  options = extend({
    port: 3000
  }, options);

  var handler = createHandler(render);
  return createServer(handler, options.port);
}

function createServer(handler, port) {
  var server = http.createServer(handler);
  var listen = server.listen;
  server.listen = frmwrkListen;
  return server;

  function frmwrkListen() {
    return listen.call(server, port);
  }
}

function createHandler(render) {
  return frmwrkHandler;

  function frmwrkHandler(req, res) {
    if (req.url === '/favicon.ico') {
      res.writeHead(404);
      return res.end();
    }

    var state = {
      route: {
        url: req.url
      }
    };

    var content = render(state);
    var vtree = layout(content);
    var html = toHtml(vtree);

    res.setHeader('Content-Type', 'text/html');
    res.end('<!DOCTYPE html>' + html);
  }
}

function layout(content) {
  return (
    h('html', [
      h('head', [
        h('title', 'frmwrk')
      ]),
      h('body', content)
    ])
  );
}
