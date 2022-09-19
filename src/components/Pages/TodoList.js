import { useState, useEffect } from "react";
import Todo from "../todo";
import TodoForm from "../TodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].hasCompleted = !newTodos[index].hasCompleted;
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodos(newTodos);
  };

  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem('todos'))
    if(newTodos)
        setTodos(newTodos)
  }, [])

  return (
    <div className="app">
      <div className="todo-list">
        <h1>TODO LIST</h1>
        <TodoForm addTodo={addTodo} />
        {todos && todos.map((todo, index) => {
          return (
            <Todo
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;
