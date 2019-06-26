
function index({time, runCallBack, finishCallBack, minInterval}) {
  this.minInterval = minInterval || 1000
  this.remainTime = time
  this.timeIntervalId = undefined
  this.finishCallBack = finishCallBack
  this.runCallBack = runCallBack
}

index.prototype.start = function () {
  this.timeIntervalId = window.setInterval(() => {
    this.perSecondCall()
  }, Math.abs(this.minInterval))
}

index.prototype.stop = function () {
  window.clearInterval(this.timeIntervalId)
}

index.prototype.perSecondCall = function () {
  if (this.remainTime >= this.minInterval) {
    this.remainTime = this.remainTime - this.minInterval
    this.runCallBack && this.runCallBack(this.format(this.remainTime))
  } else {
    if (this.timeIntervalId) {
      this.stop()
    }
    this.finishCallBack && this.finishCallBack(this.remainTime)
  }

}

index.prototype.format = function (second) {
  const timer = [
    24 * 60 * 60 * 1000,
    60 * 60 * 1000,
    60 * 1000,
  ]
  if (this.minInterval) {
    timer.push(this.minInterval)
  }
  let lastTime = second
  let arr = timer.map((unit) => {
    unit = Math.abs(unit)
    let result = Math.floor(lastTime / unit)
    lastTime = lastTime - result * unit
    if (result > 9) {
      return result
    } else if (result > 0) {
      return '0' + result
    } else {
      return 0
    }
  })
  return arr
}

export default index
