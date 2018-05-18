var h = require('hyperscript')
var fader = require('dom-fader')
var seeds = require('./seeds')

var lastCanvas = null

var startCanvas = function () {
  var canvasq = h('canvas', { style: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    'z-index': '-2'
  } })
  document.body.appendChild(canvasq)

  var canvas = canvasq

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  var ctx = canvas.getContext('2d')

  seeds(ctx, canvas)
  return canvas
}

var canvasLoop = function () {
  var c
  if (c = lastCanvas) {
    (function (c) {
      return c.fadeOut(3000).then(function () {
        return c.parentNode.removeChild(c)
      })
    })(c)
  }

  lastCanvas = startCanvas()

  var interval = 8000 + (window.innerHeight * 8)
  return setTimeout(canvasLoop, interval)
}

canvasLoop()
