import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PostTodos from "./PostTodos";
import { EditContext } from "../todoContext";

const GetTodos = () => {
  const [data, setData] = useState([]);
  const { setEditData } = useContext(EditContext); 
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/item");
      setData(res.data.todos || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/item/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo) => {
 
    setEditData(todo); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PostTodos fetchData={fetchData} />

      <h2>Todo List</h2>
      {data.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Todos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el.id}>
                <td>{el.todos}</td>
                <td>
                  <button onClick={() => handleEdit(el)}>Edit</button>
                  <button onClick={() => handleDelete(el.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default GetTodos;
