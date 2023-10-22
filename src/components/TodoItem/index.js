import './index.css'
import {MdDelete} from 'react-icons/md'

const TodoItem = ({todo, onStatusChange, onDelete}) => (
  <li className="todo-item-container d-flex flex-row">
    <input
      type="checkbox"
      className="checkbox-input"
      checked={todo.isChecked}
      onChange={() => onStatusChange(todo.uniqueNo)}
    />
    <div className="label-container d-flex flex-row">
      <label
        htmlFor={`checkbox${todo.uniqueNo}`}
        className={`checkbox-label  ${todo.isChecked ? 'checked' : ''}`}
        onClick={() => onStatusChange(todo.uniqueNo)}
      >
        {todo.text}
      </label>
      <MdDelete className="delete" onClick={() => onDelete(todo.uniqueNo)} />
    </div>
  </li>
)

export default TodoItem
