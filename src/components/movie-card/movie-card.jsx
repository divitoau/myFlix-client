import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, onAddFavorite, onRemoveFavorite }) => {
  const favoriteMoviesIds = user.FavoriteMovies;
  const token = localStorage.getItem("token");

  const addFavorite = (event) => {
    event.preventDefault();
    handleFavoriteAction("POST");
  };

  const removeFavorite = (event) => {
    event.preventDefault();
    handleFavoriteAction("DELETE");
  };

  const handleFavoriteAction = (method) => {
    fetch(
      `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        method === "POST" ? onAddFavorite(data) : onRemoveFavorite(data);
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
      <img className="card-poster" variant="top" src={movie.ImagePath} />
      <div className="card-overlay">
        <div className="overlay-textbox">
          <div className="overlay-text">
            <h3>{movie.Title}</h3>
            <h4>Genre: {movie.Genre.Name}</h4>
          </div>
          {favoriteMoviesIds.includes(movie._id) ? (
            <button onClick={removeFavorite} className="favorite-button">
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="2.136"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                    fill="#ff0000"
                  />
                </g>
              </svg>
            </button>
          ) : (
            <button onClick={addFavorite} className="favorite-button">
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="2.136"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                    fill="#000000"
                  />
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
