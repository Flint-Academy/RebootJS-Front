import React from 'react';

type AddTodoFormProps = {
  handleAdd: (name: string) => void;
};

type AddTodoFormState = {
  todoName: string;
}

class AddTodoForm extends React.Component<AddTodoFormProps, AddTodoFormState> {
  constructor(props: AddTodoFormProps) {
    super(props);
    this.state = { todoName: '' }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="nameNewTodo"
          placeholder="Nom du todo"
          onChange={(e) => this.setState({todoName: e.target.value})}
        />
        <button type="submit">Ajouter</button>
        </form>
    );
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evite de faire refresh la page
    this.props.handleAdd(this.state.todoName);
  }
}

export default AddTodoForm;