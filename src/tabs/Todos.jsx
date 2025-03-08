import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm'


const initialTodos = [
    { id: '1', text: 'Practice more' },
    { id: '2', text: 'Get all tasks done on time' },
  ];

const Todos = () => {

  const [todos, setTodos] = useState(() => {
    const todos = window.localStorage.getItem("todos");
    if (todos !== null) {
      return JSON.parse(todos);
    };

    return initialTodos;
  });

 useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
 }, [todos]);
  
  const findTodo = (text) => {
    return todos.find(todo => todo.text.toLowerCase() === text.toLowerCase()
    );
  };
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [filterTodos, setFilterTodos] = useState('')

  const addNewTodo = inputValue => {

    if (findTodo(inputValue)) {
      return alert("Todo with this text already exists!");
    };
    
    const newTodo = {
      id: nanoid(),
      text: inputValue,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setFilterTodos('');
  };

  const deleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
  };

  const handleEditTodo = (currentTodoValue) => {
    setCurrentTodo(currentTodoValue)
    setIsEditing(true)
  }

  const handledUpdateTodo = (updateTodoText) => {
    if (findTodo(updateTodoText)) {
      return alert("Todo with this text already exists!");
    };
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === currentTodo.id ? { ...todo, text: updateTodoText } : todo
    )
  );
  setIsEditing(false);
  setCurrentTodo({});
  }

  const handledCancelUpdate = () => {
    setCurrentTodo({})
    setIsEditing(false)
  }

  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(filterTodos.toLowerCase()));


  return (
    <>
      {isEditing === true ? <EditForm updateTodo={handledUpdateTodo} cancelUpdate={handledCancelUpdate} defaultValue={currentTodo.text} /> : <Form onSubmit={addNewTodo} filterTodos={filterTodos} onFilter={setFilterTodos} />}
      {todos === null ? <Text textAlign="center">There are no any todos ...</Text> :
        <TodoList todos={filteredTodos} onDelete={deleteTodo} onEdit={handleEditTodo} />}
    </>
  );
};

export default Todos;
