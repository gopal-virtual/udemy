class Tween {
  _play = (startVal, endVal, duration, callback) => {
    const startTime = new Date();
    const changeVal = endVal - startVal;
    this._ease(endVal, startVal, changeVal, startTime, duration, callback);
  };
  _ease = (
    endVal,
    startVal,
    changeVal,
    startTime,
    duration,
    callback,
    prevVal = null
  ) => {
    var elapsed = new Date() - startTime;
    if (elapsed < duration) {
      const newVal = this.quadEaseOut(elapsed / duration, changeVal, startVal);
      if (!prevVal) {
        prevVal = newVal;
      }
      callback && callback(newVal, prevVal);
      window.requestAnimationFrame(() =>
        this._ease(
          endVal,
          startVal,
          changeVal,
          startTime,
          duration,
          callback,
          newVal
        )
      );
    } else {
      callback && callback(endVal, prevVal);
    }
  };
  quadEaseIn = (normTime, changeVal, startVal) => {
    return changeVal * normTime * normTime + startVal;
  };
  quadEaseOut = (normTime, changeVal, startVal) => {
    return changeVal * normTime * (2 - normTime) + startVal;
  };
  linear = (normTime, changeVal, startVal) => {
    return changeVal * normTime + startVal;
  };
}
export default Tween;
