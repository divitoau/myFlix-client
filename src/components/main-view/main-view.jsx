import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Sucker Punch",
      director: "Zack Snyder",
      year: 2011,
    },
    {
      id: 2,
      title: "Mad Max: Fury Road",
      director: "George Miller",
      year: 2015,
    },
    {
      id: 3,
      title: "Blade Runner 2049",
      director: "Denis Villeneuve",
      year: 2017,
    },
    {
      id: 4,
      title: "Repo! The Genetic Opera",
      director: "Darren Lynn Bousman",
      year: 2008,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
