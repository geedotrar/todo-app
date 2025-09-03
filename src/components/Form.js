import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function FormTodo() {
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedTime = localStorage.getItem("todosTime");
    const currentTime = new Date().getTime();

    if (savedTodos && savedTime && currentTime - parseInt(savedTime, 10) < 3600000) {
      return JSON.parse(savedTodos);
    }
    return [
      {
        id: 1,
        item: "Learn Guitar",
      },
      {
        id: 2,
        item: "Work Out",
      },
      {
        id: 3,
        item: "Learn Code",
      },
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
    localStorage.setItem("todosTime", new Date().getTime().toString());
  }, [todo]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newData = {
      id: todo.length > 0 ? Math.max(...todo.map(t => t.id)) + 1 : 1,
      item: inputValue,
    };
    if (inputValue) {
      toast.success("Task added successfully");
      setTodo([...todo, newData]);
      setInputValue("");
    } else {
      toast.error("Please Input your Task");
    }
  };

  const handleDelete = (id) => {
    toast.success("Task deleted successfully");
    const updatedItems = todo.filter((item) => item.id !== id);
    setTodo(updatedItems);
  };

  const handleEditTask = (id) => {
    setEditTaskId(id);
    const taskToEdit = todo.find((task) => task.id === id);
    setInputValue(taskToEdit.item);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTask = {
      item: inputValue,
    };
    if (updatedTask.item === "") {
      toast.error("Please Input your Task");
    } else {
      setTodo((prevTasks) => prevTasks.map((task) => (task.id === editTaskId ? { ...task, item: updatedTask.item } : task)));
      toast.success("Task updated successfully");
      setInputValue("");
      setEditTaskId(null);
    }
  };

  const handleDeleteAllTask = async () => {
    if (window.confirm("Are you sure to delete all tasks?")) {
      toast.success("All Tasks deleted successfully");
      setTodo([]);
    }
  };

  return (
    <div className="app-container">
      <ToastContainer />
      <div className="todo-card">
        <h1 className="header">Todo List</h1>
        <form className="todo-form">
          <input value={inputValue} onChange={handleChange} className="todo-input" placeholder={editTaskId ? "Update Task..." : "Add New Task..."} maxLength={35}/>
          <button onClick={editTaskId ? handleUpdateTask : handleCreate} className="todo-button">
            {editTaskId ? "Update" : "Add"}
          </button>
        </form>
        <div className="total-tasks">Total Tasks: {todo.length}</div>

        <div className="todo-list">
          {todo.map((result) => (
            <div className="todo-row" key={result.id}>
              <span className="text-start">{result.item}</span>
              <div className="icons">
                <FiEdit
                  onClick={() => handleEditTask(result.id)}
                  className="icon edit"
                />
                <TiDeleteOutline onClick={() => !editTaskId && handleDelete(result.id)} className={`icon delete ${editTaskId ? "disabled" : ""}`} style={{ pointerEvents: editTaskId ? "none" : "auto", opacity: editTaskId ? 0.5 : 1 }} />
              </div>
            </div>
          ))}
        </div>

        {todo.length > 0 && (
          <div className="delete-all">
            <button onClick={handleDeleteAllTask}>
              <RiDeleteBin6Line size={20} />
              Delete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
