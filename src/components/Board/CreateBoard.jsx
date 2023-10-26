import React, { useState } from "react";

import API_URL from "../../../apiKey";
import axios from "axios";

export default function CreateBoard() {
  const [boardTitle, setBoardTitle] = useState("");

  const handleOnChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (boardTitle.trim() === "") return;

    const storedToken = localStorage.getItem("authToken");

    try {
      const requestBody = { title: boardTitle };
      const response = await axios.post(`${API_URL}/board`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data;
      console.log("axiosData: ", data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="createBoard">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleOnChange} />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
}
