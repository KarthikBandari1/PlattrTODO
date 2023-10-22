import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      userInput: '',
      filter: 'all',
    }
  }

  componentDidMount() {
    const storedTodoList = localStorage.getItem('todoList')
    console.log(JSON.parse(storedTodoList))
    if (storedTodoList) {
      this.setState({
        todoList: JSON.parse(storedTodoList),
      })
    }
  }

  saveTodoList = () => {
    const {todoList} = this.state
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  handleAddTodo = () => {
    const {userInput, todoList} = this.state

    const newTodo = {
      text: userInput,
      uniqueNo: Date.now(), // You can use a more unique identifier
      isChecked: false,
    }

    this.setState({
      todoList: [...todoList, newTodo],
      userInput: '',
    })

    this.saveTodoList()
  }

  handleTodoStatusChange = todoId => {
    const {todoList} = this.state

    const updatedTodoList = todoList.map(todo => {
      if (todo.uniqueNo === todoId) {
        return {...todo, isChecked: !todo.isChecked}
      }
      return todo
    })

    this.setState({todoList: updatedTodoList}, this.saveTodoList)
  }

  handleDeleteTodo = todoId => {
    const {todoList} = this.state

    const updatedTodoList = todoList.filter(todo => todo.uniqueNo !== todoId)

    this.setState({todoList: updatedTodoList}, this.saveTodoList)
  }

  getFilteredTodos = () => {
    const {todoList, filter} = this.state
    if (filter === 'completed') {
      return todoList.filter(todo => todo.isChecked)
    }
    if (filter === 'notCompleted') {
      return todoList.filter(todo => !todo.isChecked)
    }
    return todoList
  }

  setFilter = filter => {
    this.setState({filter})
  }

  render() {
    const {userInput, filter} = this.state
    const filteredTodos = this.getFilteredTodos()

    return (
      <div className="todos-bg-container">
        <div>
          <h1 className="todos-heading">Todos</h1>
        </div>
        <div className="container todo-cont">
          <h1 className="create-task-heading">Create Task</h1>
          <input
            type="text"
            className="todo-user-input"
            placeholder="What needs to be done?"
            value={userInput}
            onChange={e => this.setState({userInput: e.target.value})}
          />
          <br />
          <button
            type="button"
            className="btn btn-info mt-3 mb-3 pr-3 pl-3"
            onClick={this.handleAddTodo}
          >
            Add
          </button>
          <h1 className="todo-items-heading">My Tasks</h1>
          <button
            type="button"
            className={`filter-button btn btn-outline-info ${
              filter === 'all' ? 'active' : ''
            }`}
            onClick={() => this.setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-button btn btn-outline-info ${
              filter === 'completed' ? 'active' : ''
            }`}
            onClick={() => this.setFilter('completed')}
          >
            Completed
          </button>
          <button
            type="button"
            className={`filter-button btn btn-outline-info ${
              filter === 'notCompleted' ? 'active' : ''
            }`}
            onClick={() => this.setFilter('notCompleted')}
          >
            Not Completed
          </button>
          {filteredTodos.length === 0 ? (
            <h1 className="mt-5 mb-5 lead">
              There are no tasks to display. Please Add some tasks to do
            </h1>
          ) : (
            <ul className="todo-items-container" id="todoItemsContainer">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.uniqueNo}
                  todo={todo}
                  onStatusChange={this.handleTodoStatusChange}
                  onDelete={this.handleDeleteTodo}
                />
              ))}
            </ul>
          )}

          <button
            type="button"
            className="btn btn-info mt-3 pr-3 pl-3"
            onClick={this.saveTodoList}
            id="saveTodoButton"
          >
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default TodoList
