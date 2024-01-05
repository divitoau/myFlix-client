import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
      {isShown ? (
        <div
          style={{
            cursor: "pointer",
            transition: "transform .2s",
            transform: "scale(1.1)",
            zIndex: "3",
            backgroundColor: "#161616",
          }}
          onMouseLeave={() => setIsShown(false)}
        >
          <img className="card-poster" variant="top" src={movie.ImagePath} />
          <div
            style={{
              position: "absolute",
              top: "100%",
              backgroundColor: "#161616",
              width: "100%",
            }}
          >
            <h3>{movie.Title}</h3>
            <h4>Genre: {movie.Genre.Name}</h4>
          </div>
        </div>
      ) : (
        <div
          style={{
            cursor: "pointer",
            zIndex: "2",
            border: "none",
            backgroundColor: "#161616",
          }}
          onMouseEnter={() => setIsShown(true)}
        >
          <img className="card-poster" variant="top" src={movie.ImagePath} />
        </div>
      )}
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
