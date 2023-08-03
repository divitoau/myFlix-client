import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, onAddFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const token = localStorage.getItem("token");

  const addFavorite = () => {
    fetch(
      `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Favorite movie list: ", data.FavoriteMovies);
        onAddFavorite(data)
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Row>
      <Col md={8}>
        <Stack direction="horizontal">
          <div>
            <div>
              <h2>Title: {movie.Title} </h2>
            </div>
            <div>
              <h3>Director: {movie.Director.Name}</h3>
            </div>
          </div>
          <div className="ms-auto">
            <h4>Genre: {movie.Genre.Name}</h4>
          </div>
        </Stack>
        <div>
          <p>Description: {movie.Description}</p>
        </div>
        <Stack direction="horizontal">
          <Link to={`/`}>
            <Button variant="primary" className="back-button">
              Back
            </Button>
          </Link>
          <Button variant="primary" className="ms-auto" onClick={addFavorite}>
            Add to Favorites
          </Button>
        </Stack>
      </Col>
      <Col md={4}>
        <img className="w-100" src={movie.ImagePath} alt="" />
      </Col>
    </Row>
  );
};
