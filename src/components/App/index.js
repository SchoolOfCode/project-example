import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './App.css';
import List from './List';

const payloadToTodo = payload => ({
  title: payload.title,
  complete: payload.complete,
  id: payload._id
})

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          items: data.payload.map(payloadToTodo)
        }))
      })
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState(() => ({ term: value }));
  }

  onComplete = (i) => {
    const item = this.state.items[i];
    console.log('completed', item)
    fetch('/api/todos/'+item.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...item,
        complete: !item.complete,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          items: [
            ...prevState.items.slice(0, i),
            payloadToTodo(data.payload),
            ...prevState.items.slice(i + 1),
          ],
        }));
      })
  }

  onDelete = (i) => {
    const item = this.state.items[i];
    console.log('completed', item)
    fetch('/api/todos/'+item.id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          items: [
            ...prevState.items.slice(0, i),
            ...prevState.items.slice(i + 1),
          ],
        }));
      })
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.term) {
      return;
    }
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.term,
        complete: false,
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          items: [
            ...prevState.items,
            payloadToTodo(data.payload)
          ]
        }))
      })
  }

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.onSubmit}>
          <TextField
            value={this.state.term}
            onChange={this.onChange}
            hintText="I need to..."
            floatingLabelText="Add your todo"
          />
          <RaisedButton label="Add" primary={true} onClick={this.onSubmit} />
        </form>
        <List items={this.state.items} onComplete={this.onComplete} onDelete={this.onDelete} />
      </div>
    );
  }
}
