var SimplexNoise = require('simplex-noise')
var simplex = new SimplexNoise()
var noise = function (offset) {
  return simplex.noise2D(offset, 1)
}

var Seed = (module.exports = function (c, opts) {
  this.c = c
  this.x = opts.x || 0
  this.y = opts.y || 0
  this.vel = opts.vel || 10
  this.velStart = this.vel
  this.accel = opts.accel || 0.015
  this.theta = opts.vel || 0
  this.xOff = opts.xOff || Math.random(100)
  this.yOff = opts.yOff || Math.random(100)
  this.reversed = opts.reversed || false

  this.hasSplit = false
  this.minThreshold = 0.50 * this.vel
  this.maxThreshold = 0.90 * this.vel
  this.pSplit = 1 - 0.08

  this.opacity = 0.05
  this.opacityAccel = 0.01
  this.opacityCap = 0.03

  this.subSeeds = []
  return this
})

Seed.prototype.draw = function () {
  if (this.vel <= 0) {
    this.vel = 0
  } else {
    if (this.shouldSplit()) { this.split() }

    this.c.ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`

    var [lastX, lastY] = Array.from([this.x, this.y])

    this.xOff += 0.001
    this.yOff += 0.001

    if (this.reversed) {
      this.x -= this.moveX()
      this.y -= this.moveY()
    } else {
      this.x += this.moveX()
      this.y += this.moveY()
    }

    this.c.line(lastX, lastY, this.x, this.y)
    this.vel -= this.accel
    this.opacity += this.opacityAccel
    this.opacity *= this.vel / this.velStart
    if (this.opacity > this.opacityCap) { this.opacity = this.opacityCap }

    if ((this.y < 0) || (this.y > this.c.canvas.height) || (this.x < 0) || (this.x > this.c.canvas.width)) {
      this.vel = 0
    }
  }

  return Array.from(this.subSeeds).map((seed) => seed.draw())
}

Seed.prototype.moveX = function () {
  var n = noise(this.xOff)

  if (this.direction === 'right') {
    n = Math.abs(n)
  }

  return n * (this.vel - (this.vel / 2.0))
}

Seed.prototype.moveY = function () {
  var n = noise(this.yOff)

  if (this.direction === 'up') {
    n = -1 * Math.abs(n)
  }

  return n * (this.vel - (this.vel / 2.0))
}

Seed.prototype.split = function () {
  var seed = new Seed(this.c, {
    x: this.x,
    y: this.y,
    xOff: this.xOff + 0.001,
    yOff: this.yOff + 0.001,
    vel: this.vel * 1.1,
    reversed: this.reversed
  }
  )

  this.subSeeds.unshift(seed)
  return this.hasSplit = true
}

Seed.prototype.shouldSplit = function () {
  // return false
  var shouldSplit
  return shouldSplit =
    // (@vel > @minThreshold) and
    // (@vel < @maxThreshold) and
    (this.hasSplit === false) &&
    (Math.random() > this.pSplit)
}
