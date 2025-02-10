import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  const handleAddToDo = () => {
    if (headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== '') {
      const newTodos = [...todos];
      newTodos[index].lists.push({
        text: listInputs[index],
        completed: false
    });
      setTodos(newTodos);
      setListInputs({...listInputs, [index]: '' });
    }
  };

  const toggleTaskCompletion = (todoIndex, listIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].lists[listIndex].completed =
      !newTodos[todoIndex].lists[listIndex].completed;
    setTodos(newTodos);
  };

  const handleListInputChange = (index, value) => {
    setListInputs({...listInputs, [index]: value });
  };
  
  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => {setHeadingInput(e.target.value);}}
          />
          <button className="add-list-button" onClick={handleAddToDo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <div className="heading-todo">
              <h3>{todo.heading}</h3>
              <button className="delete-button-heading" onClick={handleDeleteTodo}>Delete Heading</button>
              <ul>
                {todo.lists.map((list, listIndex) => (
                  <li 
                    key={listIndex} 
                    className='todo_inside_list'
                    onClick={() => toggleTaskCompletion(index, listIndex)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p className={list.completed ? 'completed' : ''}>{list.text}</p>
                  </li>
                ))}
              </ul>
              <div className='add_list'>
                <input
                  type='text'
                  className='list-input'
                  placeholder='Add List'
                  value={listInputs[index] || ''}
                  onChange={(e) => handleListInputChange(index, e.target.value)}/>
                <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
               </div> 
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
