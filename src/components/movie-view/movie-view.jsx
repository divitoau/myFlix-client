import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, onChangeFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const token = localStorage.getItem("token");
  const fetchUrl = `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${user.Username}/movies/${movie._id}`;
  const isFavorite = user.FavoriteMovies.includes(movie._id);

  const handleFavorite = (method) => {
    fetch(fetchUrl, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Favorite movie list: ", data.FavoriteMovies);
        onChangeFavorite(data);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  return (
    <div className="movie-view">
      <div className="info-box">
        <div>
          <div>
            <h2>{movie.Title}</h2>
          </div>
          <div>
            <h3>Director: {movie.Director.Name}</h3>
          </div>
        </div>
        <div>
          <h4>Genre: {movie.Genre.Name}</h4>
        </div>
        <div>
          <p>{movie.Description}</p>
        </div>
        <Link to={`/`}>
          <button>Back</button>
        </Link>
        <button onClick={() => handleFavorite(isFavorite ? "DELETE" : "POST")}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      <div>
        <img src={movie.ImagePath} alt="movie poster" className="big-poster" />
      </div>
    </div>
  );
};
