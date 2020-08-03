import React from 'react';
import Todo from './Todo';

type TodoListProps = {
  title: string
}

type TodoListState = {
  listTodos: { name: string, done: boolean }[]
}

class TodoList extends React.Component<TodoListProps, TodoListState> {
  constructor(props: TodoListProps) {
    super(props);
    this.state = { listTodos: [{ name: 'Faire une Todolist', done: true }, { name: 'Faire un bouton pour ajouter des todos', done: false }] };
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <ul style={{margin: 0, padding: 0}}>
          {this.state.listTodos.map((todo) => <Todo name={todo.name} done={todo.done} />)}
        </ul>
      </div>
    );
  }
}

export default TodoList;