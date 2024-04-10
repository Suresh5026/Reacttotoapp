import React, { useState, useEffect } from "react"


export default function Todoapp(){
    const [todos, setTodos] = useState(()=>{
      const savedTodos = localStorage.getItem("todos");
    
    if (savedTodos) {
      
      return JSON.parse(savedTodos);
      
    } else {
      
      return [];
    }
    })
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [status, setStatus] = useState('Not Completed');
    const [filter, setFilter] = useState('All');
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
      
      localStorage.setItem("todos", JSON.stringify(todos));
      
    }, [todos]);

    

    
    //CREATE NEW TODO
    const addTodo = ()=>{
        // e.preventDefault();
        if(name.trim() !== ''&& desc.trim() !== ''){
            
            const newTodo = { id : Date.now(), name:name, desc:desc, status: status};
            setTodos([...todos,newTodo]);
            setName('')
            setDesc('')
            setStatus('Not Completed');
        }
    }

    //Delete Todo
    const deleteTodo=(id)=>{
        setTodos(todos.filter(todo=>todo.id !=id));
       
    }
    
    //Update Todo
    const updateTodo = (id, newName, newDescription,newStatus) => {
        setTodos(
          todos.map(todo => (todo.id === id ? { ...todo, name: newName, desc : newDescription,status:newStatus } : todo))
        );
        setEditingTodo(null);
      };

      const handleFilterChange = e => {
        setFilter(e.target.value);
      };
      
      //Filter todo
      const filteredTodos = todos.filter(todo => {
        if (filter === 'All') {
          return true;
        } else if (filter === 'Completed') {
          return todo.status === 'Completed';
        } else {
          return todo.status === 'Not Completed';
        }
      });
      //Edit Todo
      const editTodo = id => {
        const todoToEdit = todos.find(todo => todo.id === id);
        setName(todoToEdit.name);
        setDesc(todoToEdit.desc);
        setStatus(todoToEdit.status);
        setEditingTodo(id);
      };

      useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))
      },[todos])


    return(
    <>
    <div className="container">
    <div className="todoapp">
        <h1>My todo</h1>
        <div className="todoData">
        
            <input className="myClass" type="text" value={name} placeholder="Todo Name" onChange={(e)=>setName(e.target.value)} />
            <input className="myClass" type="text" value={desc} placeholder="Decsription" onChange={(e)=>setDesc(e.target.value)} />
           
            {editingTodo === null ? (
                <button className="primaryBtn" onClick={addTodo}>Add Todo</button>
            ) : (
                <button onClick={() => updateTodo(editingTodo, name, desc, status)}>Update Todo</button>
            )}
            <div style={{fontWeight:"bolder"}}>My Todos</div>
            <div className="Selectfilter">
              <label style={{fontWeight:"bolder"}}>Status Filter </label>
                <select value={filter} onChange={handleFilterChange} className={`select-${setFilter}`}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Pending</option>
                </select>
            </div><br />
        
        </div>   
    </div>

    <div className="todoResult">
        {filteredTodos.map((todo)=>(
        <div key={todo.id} className="todo-card">
            <div>
            <label>Name : </label>
            <input type="text" value={todo.name} onChange={(e)=>updateTodo(todo.id, e.target.value,todo.desc, todo.status)} 
            disabled={editingTodo !== null && editingTodo !== todo.id}/>
            </div>
            <div>
            <label>Description : </label>
            <input type="text" value={todo.desc}  onChange={(e)=>updateTodo(todo.id, todo.name, e.target.value, todo.status)}
            disabled={editingTodo !== null && editingTodo !== todo.id}/>
            </div>
            <div>
              <label>Status </label> 
            <select className="seleClas1"
              value={todo.status}
              onChange={e => updateTodo(todo.id, todo.name, todo.desc, e.target.value)}
              disabled={editingTodo !== null && editingTodo !== todo.id}
            >
              <option className="notCom" value="Not Completed">Not Completed</option>
              <option className="comCla" value="Completed">Completed</option>
            </select>
            </div>
            <div className="btnClass">
            {editingTodo === null || editingTodo !== todo.id ? (
              <button className="editBtn" onClick={() => editTodo(todo.id)}>Edit</button>
            ) : (
              <button className="editBtn" onClick={() => updateTodo(todo.id, name, desc, status)}>Save</button>
            )}
            <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>
        
        ))}
    </div>
    
    </div>
    </>

    )

}