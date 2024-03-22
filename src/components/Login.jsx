import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../contexts/auth.context";
import Alert from "./Alert";

export default function Login({ setShowLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { baseUrl, authenticateUser, isLoggedIn } = useContext(authContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (user == "" || password == "") {
      console.log("Error: fields missing");
      setError("Fields missing");
      return;
    }
    axios
      .post(`${baseUrl}/auth/login`, { user, password })
      .then(({ data }) => {
        let jwt = data.authToken;
        localStorage.setItem("authToken", jwt);
        authenticateUser();
      })
      .then(()=> setShowLogin(false))
      .catch((err) => setError("Could not finish the process, try again"));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-button-container">
          <button onClick={() => setShowLogin(false)}>close</button>
        </div>
        <div>
          <h1>Log in</h1>
          <form>
          {error != "" && <Alert message={error} setError={setError} />}
            <div>
              <label htmlFor="user">Username or e-mail:</label>
              <input id="user" type="text" onChange={(e) => setUser(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={submitHandler}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
