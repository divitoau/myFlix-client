import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    fetch("https://cool-movie-app-e45a3b27efd5.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        navigate("/login");
        alert("Signup successful");
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <div>
      <p>Welcome to</p>
      <h1 className="mb-4">myFlix</h1>{" "}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="birthday_input" style={{ color: "gray" }}>
            Birthday:
          </label>
          <input
            id="birthday_input"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <Link to={`/login`}>
        <p>Already have an account?</p>
      </Link>
    </div>
  );
};
