import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, onUserUpdate, movies, onDeregister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const token = localStorage.getItem("token");

  let favoriteMoviesList = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  const deregisterUser = () => {
    fetch(
      `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("Response: ", response);
        onDeregister();
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  const updateInfo = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    fetch(
      `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Update response: ", data);
        localStorage.setItem("user", JSON.stringify(data));
        onUserUpdate(data);
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <div>
      <Row>
        <Col>
          <h1>Hello {user.Username}!</h1>
          <p>Email: {user.Email}</p>
          <p>Birthday: {user.Birthday}</p>{" "}
          <Button onClick={deregisterUser}> Remove account permanently </Button>
        </Col>{" "}
        <Col>
          <h2>Update your info!</h2>
          <Form onSubmit={updateInfo}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <>
          {favoriteMoviesList.map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </>
      </Row>
    </div>
  );
};
