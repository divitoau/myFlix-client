import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://cool-movie-app-e45a3b27efd5.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
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
      <div className="mb-4" style={{ margin: "auto -12px auto" }}>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
      </div>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <SignupView />
                  </Col>
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
                  <Col md={4}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
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
                  <Col>The list is empty :(</Col>
                ) : (
                  <Col>
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
                  </Col>
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
                  <Col>
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
                  </Col>
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
                  <Col>The list is empty :(</Col>
                ) : (
                  <div>
                    <Row className="justify-content-md-center">
                      {" "}
                      <Col md={4}>
                        <Form className="mb-5">
                          <Form.Group className="mb-4" controlId="searchBar">
                            <Form.Control
                              type="text"
                              placeholder="Search"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              onInput={searchMovies}
                            />
                          </Form.Group>{" "}
                        </Form>
                      </Col>
                    </Row>
                    {search ? (
                      <Row>
                        <>
                          {searchedMovies.map((movie) => (
                            <Col className="mb-4 px-4" key={movie._id} md={3}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))}
                        </>
                      </Row>
                    ) : (
                      <Row>
                        <>
                          {movies.map((movie) => (
                            <Col className="mb-4 px-4" key={movie._id} md={3}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))}
                        </>
                      </Row>
                    )}
                  </div>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
