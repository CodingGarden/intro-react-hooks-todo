import React, { useState, useCallback, useEffect } from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Hello World!</h1>
//     </div>
//   );
// }

// const App = () => (
//   <div>
//     <h1>Hello World!</h1>
//   </div>
// );

// const App = () => {
//   // const nameStuff = useState('CJ');
//   // const name = nameStuff[0];
//   // const setName = nameStuff[1];
//   const [name, setName] = useState('CJ');
//   const onNameChange = useCallback((event) => {
//     console.log(event.target.value);
//     setName(event.target.value);
//   }, []);
//   return (
//     <div>
//       <form>
//         <label>Enter your name:</label>
//         <input
//           value={name}
//           onChange={onNameChange}
//         />
//       </form>
//       <h1>Hello {name}</h1>
//     </div>
//   );
// };

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false,
      },
      ...todos
    ]);
    setNewTodo('');
  }, [newTodo, todos]);

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  const markAllDone = useCallback(() => {
    // create a copy of the array
      // create a copy of each of the items
        // update the done property to be true on each of the new items
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange}
        />
        <button>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default App;
