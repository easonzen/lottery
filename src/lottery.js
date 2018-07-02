import { prefixStyle } from "./autoPrefix";

class Lottery {
  state = {
    duration: 500,
    current: 0,
    beginPos: 0,
    totalChange: 0,
    angle: 0,
    prize: -1,
    count: 9
  };

  animation = {
    Linear(t, b, c, d) {
      return (c * t) / d + b;
    },
    easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t + b;
      }
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    }
  };

  constructor(el, onComplete) {
    this.el = el;
    this.onComplete = onComplete;
  }

  start() {
    this.state.prize = Math.round(this.state.count * Math.random());
    if (this.state.prize !== -1) {
      this.state.totalChange =
        (360 / this.state.count) * (this.state.prize + Math.random()) + 3600;
      this.rotate();
    }
  }

  rotate() {
    this.state.angle = Math.ceil(
      this.animation.easeInOut(
        this.state.current,
        this.state.beginPos,
        this.state.totalChange,
        this.state.duration
      )
    );
    this.setTransform(this.state.angle % 360);
    this.state.current++;
    if (this.state.current <= this.state.duration) {
      setTimeout(() => {
        this.rotate();
      }, 17);
    } else {
      this.onComplete(this.state.prize);
      this.reset();
    }
  }

  reset() {
    this.state = {
      ...this.state,
      current: 0,
      totalChange: 0,
      angle: 0,
      prize: -1
    };
    this.setTransform(0);
  }

  setTransform(angle) {
    const transform = prefixStyle("transform");
    this.el.style[transform] = `rotate(${angle}deg)`;
  }
}

export default Lottery;
