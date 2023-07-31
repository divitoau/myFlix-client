import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://cool-movie-app-e45a3b27efd5.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data;
        setMovies(moviesFromApi);
      });
  }, []);

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty :(</div>;
  }

  return (
    <div>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};
