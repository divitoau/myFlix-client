import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <div>
      <Link to="/">myFlix</Link>
      <div>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link onClick={onLoggedOut}>Logout</Link>{" "}
          </>
        )}
      </div>
    </div>
  );
};
