class Tween {
  _play = (startVal, endVal, duration, renderId, callback) => {
    const startTime = new Date();
    const changeVal = endVal - startVal;
    this._ease(
      endVal,
      startVal,
      changeVal,
      startTime,
      duration,
      renderId,
      callback
    );
  };
  _ease = (
    endVal,
    startVal,
    changeVal,
    startTime,
    duration,
    renderId,
    callback,
    prevVal = null
  ) => {
    var elapsed = new Date() - startTime;
    if (elapsed < duration) {
      const newVal = this.quadEaseOut(elapsed / duration, changeVal, startVal);
      if (!prevVal) {
        prevVal = newVal;
      }
      callback && callback(newVal, prevVal, renderId);
      window.requestAnimationFrame(() =>
        this._ease(
          endVal,
          startVal,
          changeVal,
          startTime,
          duration,
          renderId,
          callback,
          newVal
        )
      );
    } else {
      callback && callback(endVal, prevVal, renderId);
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
