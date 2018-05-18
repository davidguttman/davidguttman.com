var CanvasHelper = (module.exports = function (canvas) {
  this.canvas = canvas
  this.ctx = this.canvas.getContext('2d')
  return this
})

CanvasHelper.prototype.line = function (x1, y1, x2, y2) {
  this.ctx.beginPath()
  this.ctx.moveTo(x1, y1)
  this.ctx.lineTo(x2, y2)
  return this.ctx.stroke()
}
