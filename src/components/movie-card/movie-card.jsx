import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export const MovieCard = ({ movie, user, onChangeFavorite }) => {
  const { FavoriteMovies, Username } = user;
  const token = localStorage.getItem("token");
  const uriMovieId = encodeURIComponent(movie._id);
  const fetchUrl = `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${Username}/movies/${movie._id}`;

  const isMovieFavorite = FavoriteMovies.includes(movie._id);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    handleFavoriteAction(isMovieFavorite ? "DELETE" : "POST");
  };

  const handleFavoriteAction = (method) => {
    const requestOptions = {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(fetchUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        onChangeFavorite(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Something went wrong");
      });
  };

  return (
    <Link to={`/movies/${uriMovieId}`}>
      <img
        className="card-poster"
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
      />
      <div className="card-overlay">
        <div className="overlay-textbox">
          <div className="overlay-text">
            <h3>{movie.Title}</h3>
            <h4>Genre: {movie.Genre.Name}</h4>
          </div>
          <button onClick={handleFavoriteClick} className="favorite-button">
            <IconContext.Provider
              value={isMovieFavorite ? { color: "red" } : { color: "white" }}
            >
              <div>
                {isMovieFavorite ? (
                  <FaHeart className="favorite-button-icon" />
                ) : (
                  <FaRegHeart className="favorite-button-icon" />
                )}
              </div>
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    _id: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    Username: PropTypes.string,
  }).isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
};
