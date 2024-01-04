import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({
  movies,
  user,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const token = localStorage.getItem("token");
  let favoriteMoviesList = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

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
        onAddFavorite(data);
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://cool-movie-app-e45a3b27efd5.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
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
    <>
      <div>
        <div>
          <div>
            <h2>{movie.Title} </h2>
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
        {favoriteMoviesList.indexOf(movie) > -1 ? (
          <button onClick={removeFavorite}>Remove from Favorites</button>
        ) : (
          <button onClick={addFavorite}>Add to Favorites</button>
        )}
      </div>
      <div>
        <img src={movie.ImagePath} alt="movie poster" style={{ width: "400px" }} />
      </div>
    </>
  );
};
