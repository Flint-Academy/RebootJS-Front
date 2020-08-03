import React, { CSSProperties } from 'react';

type TodoProps = {
  name: string,
  done: boolean
}

class Todo extends React.Component<TodoProps> {
  render() {
    const listStyle: CSSProperties = { listStyleType: 'none' };
    if(this.props.done) { listStyle['textDecoration'] = "line-through" }
    return <li style={listStyle}>{this.props.name}</li>
  }
}

export default Todo;