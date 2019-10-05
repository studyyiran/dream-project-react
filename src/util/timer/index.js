function index({ time, stopTime, runCallBack, finishCallBack, minInterval }) {
  alert(time);
  this.minInterval = minInterval || 1000;
  this.status = "stop";
  if (this.minInterval > 0) {
    this.stopTime = stopTime || true;
  } else if (this.minInterval < 0) {
    this.stopTime = stopTime || 0;
  }
  this.currentTime = time;
  this.timeIntervalId = undefined;
  this.finishCallBack = finishCallBack;
  this.runCallBack = runCallBack;
  // 自动start
  this.start();
}

index.prototype.start = function() {
  if (this.status === "stop") {
    this.status = "start";
    this.perSecondCall(true);
    this.timeIntervalId = window.setInterval(() => {
      this.perSecondCall();
    }, Math.abs(this.minInterval));
  }
};

index.prototype.stop = function() {
  window.clearInterval(this.timeIntervalId);
};

index.prototype.perSecondCall = function(firstCall) {
  if (firstCall) {
    this.runCallBack && this.runCallBack(this.format(this.currentTime));
  } else if (
    // 如果还有剩余
    Math.abs(Math.abs(this.currentTime) - Math.abs(this.stopTime)) >=
      Math.abs(this.minInterval) ||
    this.stopTime === true
  ) {
    this.currentTime = this.currentTime + this.minInterval;
    this.runCallBack && this.runCallBack(this.format(this.currentTime));
  } else {
    if (this.timeIntervalId) {
      this.stop();
    }
    this.finishCallBack && this.finishCallBack(this.currentTime);
  }
};

index.prototype.format = function(second) {
  // d h m push(s)
  const timer = [24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000];
  timer.push(Math.abs(this.minInterval));
  let lastTime = second;
  let arr = timer.map(unit => {
    unit = Math.abs(unit);
    let result = Math.floor(lastTime / unit);
    lastTime = lastTime - result * unit;
    if (result > 9) {
      return result;
    } else if (result > 0) {
      return "0" + result;
    } else {
      return "0";
    }
  });
  return arr;
};

export default index;
