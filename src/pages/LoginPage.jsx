import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import API_URL from "../../apiKey";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  //   const requestBody = { email, password };

  //   axios
  //     .post(`${API_URL}/auth/login`, requestBody)
  //     .then((response) => {
  //       console.log("JWT token", response.data.authToken);

  //       storeToken(response.data.authToken);
  //       authenticateUser();
  //       navigate("/boards");
  //     })
  //     .catch((error) => {
  //       const errorDescription = error.response.data.message;
  //       setErrorMessage(errorDescription);
  //     });
  // };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      // Login
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      console.log("JWT token", response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();

      // Redirect to the first of the board elements
      const boardsResponse = await axios.get(`${API_URL}/getBoards`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const boards = boardsResponse.data.boards;
      console.log("These are the boards 🤣", boards);
      if (boards.length > 0) {
        // If there are boards, navigate to the boards page with the board ID as a parameter
        // navigate(`/boards/${boards[0].id}`);
        navigate("/boards");
      } else {
        // Handle the case where there are no boards
        setErrorMessage("No boards found for this user.");
      }

      // navigate("/boards");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
