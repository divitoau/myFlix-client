import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
      {isShown ? (
        <Card
          className="h-100"
          style={{
            cursor: "pointer",
            transition: "transform .2s",
            transform: "scale(1.1)",
            zIndex: "3",
            backgroundColor: "#161616",
          }}
          onMouseLeave={() => setIsShown(false)}
        >
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            style={{ aspectRatio: "7/10" }}
          />
          <Card.Body
            style={{
              position: "absolute",
              top: "100%",
              backgroundColor: "#161616",
              width: "100%",
            }}
          >
            <Card.Title style={{ color: "#eee" }}>{movie.Title}</Card.Title>
            <Card.Text style={{ color: "#eee" }}>
              Genre: {movie.Genre.Name}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card
          className="h-100"
          style={{
            cursor: "pointer",
            zIndex: "2",
            border: "none",
            backgroundColor: "#161616",
          }}
          onMouseEnter={() => setIsShown(true)}
        >
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            style={{ aspectRatio: "7/10" }}
          />
        </Card>
      )}
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
