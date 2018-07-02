import React, { Component } from "react";
import Lottery from "./lottery";
import "./App.css";

const onComplete = function(prize) {
  this.setState({
    clicked: false,
    prize: prize
  });
  alert(`恭喜您获得${this.state.prize}等奖~`);
};

class App extends Component {
  componentDidMount() {
    this.lottery = new Lottery(this.refs.circle, onComplete.bind(this));
  }

  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }

  start = () => {
    // if (this.state.prize > 0) {
    //   alert("您已经参与过抽奖活动~");
    //   return;
    // }
    if (!this.state.clicked) {
      this.setState({
        clicked: true
      });
      this.lottery.start();
    }
  };

  render() {
    return (
      <div className="App">
        <div className="circle-wrap">
          <img
            className="circle"
            src={require("./images/circle.png")}
            alt="circle"
            ref="circle"
          />
          <img
            className="pointer"
            src={require("./images/pointer.png")}
            alt="pointer"
            ref="pointer"
          />
        </div>
        <button className="start-btn" onClick={this.start}>
          开始抽奖
        </button>
      </div>
    );
  }
}

export default App;
