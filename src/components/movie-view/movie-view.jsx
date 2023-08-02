import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
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
        <Link to={`/`}>
          <Button variant="primary" className="back-button">
            Back
          </Button>
        </Link>
      </Col>
      <Col md={4}>
        <img className="w-100" src={movie.ImagePath} alt="" />
      </Col>
    </Row>
  );
};

/* MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
}; */
