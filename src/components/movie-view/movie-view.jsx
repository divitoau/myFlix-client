import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row>
      <Col md={8} style={{ border: "1px solid gold" }}>
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
        <Button variant="primary" onClick={onBackClick} className="back-button">
          Back
        </Button>
      </Col>
      <Col style={{ border: "1px solid gold" }}>
        <img className="w-100" src={movie.ImagePath} alt="" />
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
