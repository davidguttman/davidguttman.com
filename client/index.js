var h = require('hyperscript')
var fit = require('canvas-fit')
var fader = require('dom-fader')
var seeds = require('./seeds')

var lastCanvas = null

window.addEventListener('resize', fitCanvas, false)

canvasLoop()

function startCanvas () {
  var canvas = h('canvas', { style: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    'z-index': '-2'
  } })
  document.body.appendChild(canvas)

  fit(canvas, document.body, window.devicePixelRatio)

  var ctx = canvas.getContext('2d')

  seeds(ctx, canvas)
  return canvas
}

function canvasLoop () {
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

function fitCanvas () {
  if (lastCanvas) fit(lastCanvas, document.body, window.devicePixelRatio)
}
