import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  onUserUpdate,
  movies,
  onDeregister,
  onChangeFavorite,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const token = localStorage.getItem("token");
  const fetchUrl = `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${user.Username}`;

  const favoriteMoviesList = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  const deregisterUser = () => {
    fetch(fetchUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Response: ", response);
        onDeregister();
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  const updateInfo = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(fetchUrl, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update response: ", data);
        localStorage.setItem("user", JSON.stringify(data));
        onUserUpdate(data);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };
  return (
    <div>
      <h1>Hello {user.Username}!</h1>
      <div>
        <h2>Account Information</h2>
        <p>Email: {user.Email}</p>
        <p>
          Birthday: {user.Birthday.slice(5, 7)}/{user.Birthday.slice(8, 10)}/
          {user.Birthday.slice(0, 4)}
        </p>
        <button className="remove-profile-button" onClick={deregisterUser}>
          Remove account permanently
        </button>
      </div>
      <div>
        <h2>Update Information</h2>
        <form onSubmit={updateInfo}>
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
            <label htmlFor="birthday_input">Birthday:</label>
            <input
              id="birthday_input"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
      <h2>Favorites</h2>
      <div className="card-container">
        <>
          {favoriteMoviesList.map((movie) => (
            <div key={movie._id} className="movie-card">
              <MovieCard
                movie={movie}
                user={user}
                onChangeFavorite={(user) => {
                  onChangeFavorite(user);
                }}
              />
            </div>
          ))}
        </>
      </div>
    </div>
  );
};
