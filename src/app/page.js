"use client";
import { useState } from "react";
import "./click.css";
import styles from "./page.module.css";
import Click from "./click";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); 
  const [activeFilter, setActiveFilter] = useState("all");


  const addTodoHandler = () => {
    if (newTodo.trim() === "") return; 
    setTodos([...todos, { todo: newTodo, isCompleted: false }]);
    setNewTodo(""); 
  };
 

  const deleteHandler = (todoToDelete) => {
    if (window.confirm("Are you sure you want to delete this task ?")) {
      const updatedTodos = todos.filter(
        (todo) => todo.todo !== todoToDelete.todo
      );
      setTodos(updatedTodos);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return !todo.isCompleted;
    if (activeFilter === "completed") return todo.isCompleted;
    return true;
  });


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodoHandler();
    }
  };

  const completedTasksLength = todos.filter((todo) => todo.isCompleted).length;

  const toggleIsCompleted = (index, todo) => {
    const todoIndex = todos.findIndex((t) => t.todo === todo.todo);
    if (todoIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = {
        ...updatedTodos[todoIndex],
        isCompleted: !updatedTodos[todoIndex].isCompleted,
      };
      setTodos(updatedTodos);
    }
  };
  const clearCompletedHandler = () => {
    if (todos.filter((todo) => todo.isCompleted).length === 0) {
      alert("There are no completed tasks");
    } else {
      const reamainingTodos = todos.filter((todo) => !todo.isCompleted);
      setTodos([...reamainingTodos]);
      alert("Are you sure you want to clear all completed tasks?");
    }
  };

  return (
    <div>
      <div className={styles[`todo-container`]}>
        <h1>To-Do list</h1>
        <div className={`${styles.flex} ${styles["bg-blue"]}`}>
          <input
            type="text"
            value={newTodo}
            placeholder="Add a new task"
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <button onClick={addTodoHandler}>Add</button>
        </div>
        <div className={`${styles.flex} ${styles.filterButtons}`}>
          <button
            className={activeFilter === "all" && styles.activeStyle}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={activeFilter === "active" && styles.activeStyle}
            onClick={() => setActiveFilter("active")}
          >
            Active
          </button>
          <button
            className={activeFilter === "completed" && styles.activeStyle}
            onClick={() => setActiveFilter("completed")}
          >
            Completed
          </button>
        </div>
        <div className={styles.tasks}>
          {filteredTodos.map((todo, index) => (
            <div className={styles.listCont} key={index}>
              <div className={styles.listContChild}>
                <input
                  type="checkbox"
                  onClick={() => toggleIsCompleted(index, todo)}
                  checked={todo.isCompleted}
                />
                <p className={todo.isCompleted ? styles.completed : ""}>
                  {todo.todo}
                </p>
              </div>
              <button onClick={() => deleteHandler(todo)}>delete</button>
            </div>
          ))}
        </div>
        {todos.length > 0 ? (
          <div className={styles.parag}>
            <p>
              {completedTasksLength} of {todos.length} tasks completed
            </p>
            <button onClick={() => clearCompletedHandler()}>
              Clear Completed
            </button>
          </div>
        ) : (
          <div className={styles.emptyTask}>
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
        <div className={styles.bottom}>
          <p>Powered by</p>
          <a href="https://github.com/jamiyansurenn">Kdl2k</a>
        </div>
      </div>
      <Click />
    </div>
  );
}