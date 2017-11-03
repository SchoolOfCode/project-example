import React, { Component } from 'react';
import './App.css';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState(() => ({ term: value }));
  }

  onComplete(i) {
    this.setState(prevState => ({
      items: [
        ...prevState.items.slice(0, i),
        {
          todo: prevState.items[i].todo,
          complete: !prevState.items[i].complete,
        },
        ...prevState.items.slice(i + 1),
      ],
    }));
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.state.term) {
      return;
    }
    this.setState(prevState => ({
      term: '',
      items: [
        ...prevState.items,
        {
          todo: prevState.term,
          complete: false,
        },
      ],
    }));
  }

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Submit</button>
        </form>
        <List items={this.state.items} onComplete={this.onComplete} />
      </div>
    );
  }
}
