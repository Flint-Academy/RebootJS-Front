import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';
import TodoList from './components/TodoList';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HelloWorld />
        <Counter />
        <TodoList title="my first todolist"/>
      </header>
    </div>
  );
}

export default App;
