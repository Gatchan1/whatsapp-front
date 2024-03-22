import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { authContext } from "../contexts/auth.context";

export default function Navbar() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isLoading, isLoggedIn, authenticateUser, user } = useContext(authContext);

  return (
    <nav>
      <ul className="navbar subset">
      <li>
        <Link to="/">Homepageee</Link>
      </li>
      <li className="profile-link">
        {isLoggedIn && <Link to={`/${user.name}`} >Profile page</Link>}
      </li>
      </ul>
      {!isLoading && !isLoggedIn && (
        <div className="navbar subset auth">
          <button onClick={() => setShowSignup(true)} className="signup">
            Sign up
          </button>
          <button onClick={() => setShowLogin(true)} className="login">
            Log in
          </button>
          {showSignup && <Signup setShowSignup={setShowSignup} />}
          {showLogin && <Login setShowLogin={setShowLogin} />}
        </div>
      )}
      {isLoggedIn && (
        <div className="navbar subset logout">
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              authenticateUser();
            }}
            className="logout"
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
