import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <div className="navigation">
      {!user ? (
        <>
          <Link className="nav-logo" to="/login">
            myFlix
          </Link>
          <div className="nav-link-container">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </>
      ) : (
        <>
          <Link className="nav-logo" to="/">
            myFlix
          </Link>
          <div className="nav-link-container">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link onClick={onLoggedOut}>Logout</Link>
          </div>
        </>
      )}
    </div>
  );
};
