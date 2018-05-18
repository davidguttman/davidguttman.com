var CanvasHelper = require('../canvas')
var Seed = require('./seed')

module.exports = function (ctx, canvas) {
  var seed
  var c = new CanvasHelper(canvas)

  var seeds = []
  var xOff = Math.random() * 100
  var yOff = Math.random() * 100

  var w = canvas.width
  var h = canvas.height

  var nSeeds = 140

  for (var i = 0, end = nSeeds, asc = end >= 0; asc ? i <= end : i >= end; asc ? i++ : i--) {
    var j = (i * (Math.PI * 2)) / nSeeds
    var x = (w / 2) + (((Math.cos(j)) * w) / 4)
    var y = (h / 2) + (((Math.sin(j)) * h) / 4)
    xOff = xOff + (j / 200)
    yOff = (xOff + 1) + (j / 200)

    seed = new Seed(c, {
      x: x,
      y: y,
      xOff: xOff,
      yOff: yOff
    }
    )

    var seed2 = new Seed(c, {
      x: x,
      y: y,
      xOff: xOff,
      yOff: yOff,
      reversed: true
    }
    )

    seeds.push(seed)
    seeds.push(seed2)
  }

  return setInterval(function () {
    return ((() => {
      var result = []
      for (seed of Array.from(seeds)) {
        result.push(seed.draw())
      }
      return result
    })())
  }
  , 1000 / 10)
}
