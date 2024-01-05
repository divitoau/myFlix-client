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
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
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
        });
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
      <div>
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
                  <div>The list is empty :(</div>
                ) : (
                  <div>
                    <MovieView
                      movies={movies}
                      user={user}
                      onAddFavorite={(user) => {
                        setUser(user);
                      }}
                      onRemoveFavorite={(user) => {
                        setUser(user);
                      }}
                    />
                  </div>
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
                  <div>
                    <ProfileView
                      movies={movies}
                      user={user}
                      onUserUpdate={(user) => {
                        setUser(user);
                      }}
                      onDeregister={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
                  </div>
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
                  <div>The list is empty :(</div>
                ) : (
                  <div>
                    <div>
                      <form>
                        <input
                          className="search-bar"
                          type="text"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onInput={searchMovies}
                        />
                      </form>
                    </div>
                    {search ? (
                      <div className="card-container">
                        <>
                          {searchedMovies.map((movie) => (
                            <div key={movie._id} className="movie-card">
                              <MovieCard movie={movie} />
                            </div>
                          ))}
                        </>
                      </div>
                    ) : (
                      <div className="card-container">
                        <>
                          {movies.map((movie) => (
                            <div key={movie._id} className="movie-card">
                              <MovieCard movie={movie} />
                            </div>
                          ))}
                        </>
                        <div className="test-poster">
                          <div className="test-overlay">
                            <div className="overlay-textbox">
                              <h2>test title</h2>
                              <h3>test other stuff</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
