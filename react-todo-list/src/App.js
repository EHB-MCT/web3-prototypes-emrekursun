import React, {useState} from 'react';
import './App.css';
import TodoForm from "./component/TodoForm";
import TodoList from "./component/TodoList";

function App() {
  const  [todos, setTodos]  = useState([]);

  function addTodo(todo){
    setTodos([todo,...todos]);
  } 

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }



  return (
    <div className="App">
      <header className="App-header">
        <p>React To Do</p>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
      </header>
    </div>
  );
}

export default App;
