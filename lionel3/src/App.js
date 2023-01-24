import logo from './logo.svg';
import React from 'react';
import './App.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',sts:'balls'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }

  handleSubmit(event) {
    this.state.sts="cock";
    event.preventDefault();
  }

  render() {
    return (
      <html>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@600;300;100&display=swap" rel="stylesheet"></link>
        </head>
      <div class="pp-header">
        <h1>Lionel 3</h1>
        <p class="sub">It's like lionel 2, but better.</p>
        <h2>Who are you?</h2>
        <form onSubmit={this.handleSubmit} class="nameForm">        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      </html>
    );
  }
}

export default Timer;
