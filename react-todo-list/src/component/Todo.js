import React, {useState} from "react";
import '../App.css';
function Todo({todo, toggleComplete, removeTodo}){

    const [isShown, setIsShown] = useState(false);

    function handleCheckboxClick() {
        toggleComplete(todo.id);
      }
    
      function handleRemoveClick() {
        removeTodo(todo.id);
      }
    
      

    return(
        // Implementatie van design is inline
        <div  onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} class="element"style={{ display:"flex"}} >
            {isShown && (
        <div>
           <input style={{ display:"block"}} class="checkB" type="checkbox" onClick={handleCheckboxClick} />
           
        </div>
      )}
        <input style={{ display:"none"}} class="checkB" type="checkbox" onClick={handleCheckboxClick} />
        <li class="text" style={{ textDecoration: todo.completed ? "line-through" : false}}>{todo.task}</li>
        <button style={{ display:"none"}} onClick={handleRemoveClick}>X</button>
        {isShown && (
        <div>
         
           <button style={{ display:"block"}} onClick={handleRemoveClick}>X</button>
        </div>
      )}

        

        

        </div>

        
    );

}

export default Todo;