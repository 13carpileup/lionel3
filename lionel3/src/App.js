import logo from './logo.svg';
import React from 'react';
import './App.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <html>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@600;100&display=swap" rel="stylesheet"></link>
        </head>
      <div class="pp-header">
        <h1>Lionel 3</h1>
        <p class="sub">It's like lionel 2, but better.</p>
      </div>
      </html>
    );
  }
}

export default Timer;
