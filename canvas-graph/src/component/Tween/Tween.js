class Tween {
  _play = (startVal, endVal, duration, callback) => {
    const startTime = new Date();
    const changeVal = endVal - startVal;
    this._ease(endVal, startVal, changeVal, startTime, duration, callback);
  };
  _ease = (endVal, startVal, changeVal, startTime, duration, callback) => {
    var elapsed = new Date() - startTime;
    if (elapsed < duration) {
      const newVal = this.quadEaseOut(elapsed / duration, changeVal, startVal);
      callback && callback(newVal);
      window.requestAnimationFrame(() =>
        this._ease(endVal, startVal, changeVal, startTime, duration, callback)
      );
    } else {
      callback && callback(endVal);
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
