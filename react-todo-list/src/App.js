import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const  [todos, setTodos]  = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <p>React To Do</p>
      </header>
    </div>
  );
}

export default App;
