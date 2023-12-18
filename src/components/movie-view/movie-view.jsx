import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Gallery } from "../gallery/gallery";

export const MovieView = ({
  movies,
  user,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const { movieID } = useParams();
  const movie = movies.find((m) => m._id === movieID);
  const token = localStorage.getItem("token");
  let favoriteMoviesList = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  const apiFavesUrl = `http://localhost:8080/users/${user.Username}/movies/${movie._id}`;

  const addFavorite = () => {
    fetch(apiFavesUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Favorite movie list: ", data.FavoriteMovies);
        onAddFavorite(data);
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  const removeFavorite = () => {
    fetch(apiFavesUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Favorite movie list: ", data.FavoriteMovies);
        onRemoveFavorite(data);
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
              <h2>{movie.Title} </h2>
            </div>
            <div>
              <h3>Director: {movie.Director.Name}</h3>
            </div>
          </div>
          <div className="ms-auto">
            <h4>Genre: {movie.Genre.Name}</h4>
          </div>
        </Stack>
        <div className="mb-3">
          <p>{movie.Description}</p>
        </div>
        <Stack direction="horizontal" className="mb-3">
          <Link to={`/`}>
            <Button variant="primary" className="back-button">
              Back
            </Button>
          </Link>
          {favoriteMoviesList.indexOf(movie) > -1 ? (
            <Button
              variant="primary"
              className="ms-auto"
              onClick={removeFavorite}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button variant="primary" className="ms-auto" onClick={addFavorite}>
              Add to Favorites
            </Button>
          )}
        </Stack>
        <Gallery movieID={movieID}></Gallery>
      </Col>
      <Col md={4}>
        <img className="w-100" src={movie.ImagePath} alt="" />
      </Col>
    </Row>
  );
};
