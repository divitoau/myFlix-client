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

  const apiUsersUrl = `http://my-first-load-balancer-1768505441.us-east-1.elb.amazonaws.com/users/${user.Username}`;

  const deregisterUser = () => {
    fetch(apiUsersUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
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
    fetch(apiUsersUrl, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
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
      <h1 className="mb-4">Hello {user.Username}!</h1>
      <Row>
        <Col>
          <h2>Account Information</h2>
          <p>Email: {user.Email}</p>
          <p>
            Birthday: {user.Birthday.slice(5, 7)}/{user.Birthday.slice(8, 10)}/
            {user.Birthday.slice(0, 4)}
          </p>{" "}
          <p
            style={{ color: "red", cursor: "pointer" }}
            onClick={deregisterUser}
          >
            {" "}
            Remove account permanently{" "}
          </p>
        </Col>{" "}
        <Col>
          <h2>Update Information</h2>
          <Form onSubmit={updateInfo}>
            <Form.Group className="mb-4" controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
              />
            </Form.Group>{" "}
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Pasword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBirthday">
              <Form.Label style={{ color: "gray" }}>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="mb-4" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      <h2>Favorites</h2>
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
