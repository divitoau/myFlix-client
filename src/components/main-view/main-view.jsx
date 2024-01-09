import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) {
      fetch("https://cool-movie-app-e45a3b27efd5.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((movies) => {
          setMovies(movies);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [token]);

  const searchMovies = (event) => {
    event.preventDefault();
    setSearchedMovies(
      movies.filter((movie) =>
        movie.Title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <div>
                  <SignupView />
                </div>
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <div>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                </div>
              )}
            </>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <p>The list is empty :(</p>
              ) : (
                <MovieView
                  movies={movies}
                  user={user}
                  onChangeFavorite={(updatedUser) => setUser(updatedUser)}
                />
              )}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  movies={movies}
                  user={user}
                  onUserUpdate={(updatedUser) => setUser(updatedUser)}
                  onDeregister={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}
                  onChangeFavorite={(updatedUser) => setUser(updatedUser)}
                />
              )}
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <p>The list is empty :(</p>
              ) : (
                <div className="main-view">
                  <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onInput={searchMovies}
                  />
                  <div className="card-container">
                    {search ? (
                      <>
                        {searchedMovies.map((movie) => (
                          <div key={movie._id} className="movie-card">
                            <MovieCard
                              movie={movie}
                              user={user}
                              onChangeFavorite={(updatedUser) =>
                                setUser(updatedUser)
                              }
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {movies.map((movie) => (
                          <div key={movie._id} className="movie-card">
                            <MovieCard
                              movie={movie}
                              user={user}
                              onChangeFavorite={(updatedUser) =>
                                setUser(updatedUser)
                              }
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
