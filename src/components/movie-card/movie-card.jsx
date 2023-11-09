import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
      {isShown ? (
        <div
          style={{
            transform: "scale(1.4)",
          }}
        >
          <Card
            className="h-100"
            style={{
              cursor: "pointer",
              zIndex: "50",
            }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <Card.Img variant="top" src={movie.ImagePath} />
            {isShown && (
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text style={{ color: "darkgrey" }}>
                  Genre: {movie.Genre.Name}
                </Card.Text>
              </Card.Body>
            )}
          </Card>
        </div>
      ) : (
        <Card
          className="h-100"
          style={{
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <Card.Img variant="top" src={movie.ImagePath} />
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
