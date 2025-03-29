import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { EditContext } from "../todoContext";
const PostTodos = ({ fetchData }) => {
  const { editData, setEditData } = useContext(EditContext); 
  const [todo, setTodo] = useState("");


  useEffect(() => {
    if (editData) {
      setTodo(editData.todos.trim() || "");
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (!todo.trim()) {
      alert("Please enter a todo");
      return;
    }

    try {
      if (editData) {
        await axios.put(`http://localhost:8080/item/${editData.id}`, { todos: todo });
        setEditData(null); 
      } else {
        await axios.post("http://localhost:8080/item", { todos: todo });
      }

      alert("Todo saved successfully!");
      setTodo("");
      fetchData();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter your todo"
      />
      <button onClick={handleSubmit}>{editData ? "Update Todo" : "Add Todo"}</button>
    </div>
  );
};

export default PostTodos;
