import React from "react";

type CounterState = {
  count: number;
  ticker?: NodeJS.Timeout
}

class Counter extends React.Component<{}, CounterState>{
  constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <h3>&#128515; {this.state.count} &#128515;</h3>
    );
  }

  componentDidMount(){
    this.setState({ticker: setInterval(() => this.tick(), 1000)});
  }

  tick(){
    const actualCount = this.state.count;
    this.setState({count: actualCount + 1})
  }

  componentWillUnmount(){
    const ticker = this.state.ticker;
    if(ticker) clearInterval(ticker);
  }
}

export default Counter;