import axios from "axios";
import { useState, useContext } from "react";
import { authContext } from "../contexts/auth.context";
import Alert from "./Alert";

export default function Signup({ setShowSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { baseUrl, authenticateUser, isLoggedIn } = useContext(authContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (name == "" || email == "" || password == "" || passwordRepeat == "") {
      console.log("Error: fields missing");
      setError("Fields missing");
      return;
    }
    if (password != passwordRepeat) {
      console.log("Passwords should match");
      setError("Passwords should match");
      return;
    }
    const user = { name, email, password, passwordRepeat };
    axios
      .post(`${baseUrl}/auth/signup`, user)
      .then(({ data }) => {
        console.log(data);
        setLoginMessage("Successfully signed up! Proceeding to automatic log in..."); //TODO style flashy!
        setTimeout(login, 2000);
      })
      .catch((err) => setError("Could not finish the process, try again"));
  };

  const login = () => {
    axios
      .post(`${baseUrl}/auth/login`, { user: name, password })
      .then(({ data }) => {
        let jwt = data.authToken;
        localStorage.setItem("authToken", jwt);
        authenticateUser();
      })
      .then(() => setShowSignup(false))
      .catch((err) => setError("Could not finish the process, try again"));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {loginMessage && (
          <div>
            <p>{loginMessage}</p>
          </div>
        )}
        <div className="close-button-container">
          <button onClick={() => setShowSignup(false)}>close</button>
        </div>
        <h1>Sign up</h1>
        <form>
        {error != "" && <Alert message={error} setError={setError} />}
          <div>
            <label htmlFor="name">Username:</label>
            <input id="name" type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="passwordRepeat">Password repeat:</label>
            <input id="passwordRepeat" type="password" onChange={(e) => setPasswordRepeat(e.target.value)} />
          </div>
          <button onClick={submitHandler}>Submit</button>
        </form>
      </div>
    </div>
  );
}
