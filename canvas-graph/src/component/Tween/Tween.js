class Tween {
    _play = (startVal, endVal, duration, callback) => {
        const startTime = new Date()
        const changeVal = endVal - startVal
        this._ease(endVal, startVal, changeVal, startTime, duration, callback)
    }
    _ease = (
        endVal,
        startVal,
        changeVal,
        startTime,
        duration,
        callback,
        prevVal = null
    ) => {
        var elapsed = new Date() - startTime
        if (elapsed < duration) {
            const newVal = this.quadEaseOut(
                elapsed / duration,
                changeVal,
                startVal
            )
            if (!prevVal) {
                prevVal = newVal
            }
            callback && callback(newVal, prevVal)
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
            )
        } else {
            callback && callback(endVal, prevVal)
        }
    }
    /**
    TERMS OF USE - EASING EQUATIONS

    Open source under the BSD License.

    Copyright © 2001 Robert Penner
    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification,
    are permitted provided that the following conditions are met:

    Redistributions of source code must retain the above copyright notice, this list of
    conditions and the following disclaimer.
    Redistributions in binary form must reproduce the above copyright notice, this list
    of conditions and the following disclaimer in the documentation and/or other materials
    provided with the distribution.

    Neither the name of the author nor the names of contributors may be used to endorse
    or promote products derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
    COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
    EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
    GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
    AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
    OF THE POSSIBILITY OF SUCH DAMAGE.
    */
    quadEaseIn = (normTime, changeVal, startVal) => {
        return changeVal * normTime * normTime + startVal
    }
    quadEaseOut = (normTime, changeVal, startVal) => {
        return changeVal * normTime * (2 - normTime) + startVal
    }
    linear = (normTime, changeVal, startVal) => {
        return changeVal * normTime + startVal
    }
}
export default Tween
