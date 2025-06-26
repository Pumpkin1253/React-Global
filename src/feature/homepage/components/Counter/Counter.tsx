import React from "react";
import styles from "./Counter.module.scss";

export interface CounterProps {
  initialValue: number;
}

interface CounterState {
  count: number;
}

export class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initialValue,
    };
  }

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  decrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  render() {
    const { count } = this.state;

    return React.createElement(
      "div",
      {
        className: styles.counter,
      },
      React.createElement("button", { onClick: this.decrement }, "–"),
      React.createElement("span", { className: styles.counterText }, count),
      React.createElement("button", { onClick: this.increment }, "+")
    );
  }
}
