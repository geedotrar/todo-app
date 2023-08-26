import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function FormTodo() {
  const [todo, setTodo] = useState([
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
  ]);
  const [inputValue, setInputValue] = useState();
  const [editTaskId, setEditTaskId] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newData = {
      id: todo.length + 1,
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
    <div>
      <ToastContainer />
      <div>
        <h1 className="header">Todo List</h1>
        <form className="todo-form">
          <input value={inputValue} onChange={handleChange} className="todo-input" placeholder={editTaskId ? "Update Task" : "Add Task"} required />
          <button onClick={editTaskId ? handleUpdateTask : handleCreate} className="todo-button">
            {editTaskId ? "Update" : "Add"}{" "}
          </button>
        </form>

        {todo.map((result) => {
          return (
            <div className="todo-row">
              {result.item}
              <div>
                <FiEdit onClick={() => handleEditTask(result.id)} className="todo-button-update" size={30}></FiEdit>
                <TiDeleteOutline onClick={() => handleDelete(result.id)} className="todo-button-delete" size={40}></TiDeleteOutline>
              </div>
            </div>
          );
        })}

        {todo.length === 0 ? (
          <></>
        ) : (
          <span class="hovertext" data-hover="Delete All Tasks">
            <RiDeleteBin6Line onClick={() => handleDeleteAllTask()} className="todo-button-deleteAll" size={40} />
          </span>
        )}
        <div id="total-tasks">Total Tasks: {todo.length}</div>
      </div>
    </div>
  );
}
