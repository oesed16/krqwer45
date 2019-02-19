import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input.

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      classError: 'error'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    if (this.state.newTask) {
      const id = this.state.tasks.length + 1;
      this.setState({
        tasks: this.state.tasks.concat({id: id, name: this.state.newTask, done: false}),
        newTask: '',
        classError: ''
      });
    } else {
      this.setState({
        classError: 'error'
      });
    }
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      newTask: e.target.value
    });
  }

  handleClick(task) {
    const { id, name, done } = task;
    const tasks = this.state.tasks.slice();
    tasks[id-1] = {id: id, name: name, done: !done};
    this.setState({
      tasks: tasks
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li key={task.id} className={task.done === true ? 'done' : ''} onClick={() => this.handleClick(task)}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="new-task"
              placeholder="Ingresa una tarea y oprime Enter"
              className={this.state.classError}
              onChange={this.handleChange}
              value={this.state.newTask}/>
          </form>
        </div>
      </div>
    )
  }
}

export default App;