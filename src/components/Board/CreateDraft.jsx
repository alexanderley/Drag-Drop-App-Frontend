import axios from "axios";
import React, { useState } from "react";
import API_URL from "../../../apiKey";

export default function CreateDraft() {
  const [draftTitle, setDraftTitle] = useState("");

  const handleOnChange = (e) => {
    setDraftTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const boardId = "6536473117ee7826f3ac1f55";

    const storedToken = localStorage.getItem("authToken");

    try {
      const requestBody = { title: draftTitle, boardId };
      const response = axios.post(`${API_URL}/addDraft`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data;
      console.log("axiosData: ", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleOnChange} />
        <button type="submit">Create Draft</button>
      </form>
    </>
  );
}
