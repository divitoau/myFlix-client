import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      Genre: {
        Name: "Fantasy",
        Description:
          "Fantasy fiction is a genre of fiction that involves elements that cannot exist within the real world. This fictional universe includes things like magic, mythology, or life from other worlds or universes.",
      },
      Director: {
        Name: "Zack Snyder",
        Bio: "Zachary Edward Snyder is an American film director, producer, screenwriter, and cinematographer. He made his feature film debut in 2004 with Dawn of the Dead, a remake of the 1978 horror film of the same name.",
        Birth: "1966",
        Death: "",
      },
      //   _id: "64b732313fd2ea89f687c6c0",
      Title: "Sucker Punch",
      Description:
        "Locked away, a young woman named Babydoll (Emily Browning) retreats to a fantasy world where she is free to go wherever her mind takes her.",
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BNDEwNGRlNjQtZjI4OC00ZmMxLWEyYmQtNGI1NDk4YmUyYTNkXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_.jpg",
      Featured: false,
    },
    {
      _id: 2,
      Genre: {
        Name: "Action",
        Description:
          "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
      },
      Director: {
        Name: "George Miller",
        Bio: "George Miller is an Australian filmmaker best known for his Mad Max franchise, whose second installment, Mad Max 2, and fourth, Fury Road, have been hailed as two of the greatest action films of all time, with Fury Road winning six Academy Awards.",
        Birth: "1945",
        Death: "",
      },
      //      _id: "64b72ddb3fd2ea89f687c6bd",
      Title: "Mad Max: Fury Road",
      Description:
        "Years after the collapse of civilization, the tyrannical Immortan Joe enslaves apocalypse survivors inside the desert fortress the Citadel.\n",
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
      Featured: true,
    },
    {
      _id: 3,
      Genre: {
        Name: "Sci-Fi",
        Description:
          "Science fiction (sometimes shortened to sf or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life",
      },
      Director: {
        Name: "Denis Villeneuve",
        Bio: "Denis Villeneuve OC CQ RCA is a French-Canadian filmmaker. He is a four-time recipient of the Canadian Screen Award for Best Direction, winning for Maelström in 2001, Polytechnique in 2009, Incendies in 2010 and Enemy in 2013.",
        Birth: "1967",
        Death: "",
      },
      //      _id: "64b7300e3fd2ea89f687c6be",
      Title: "Blade Runner 2049",
      Description:
        "Officer K (Ryan Gosling), a new blade runner for the Los Angeles Police Department, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. His discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former blade runner who's been missing for 30 years.",
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_FMjpg_UX1000_.jpg",
      Featured: true,
    },
    {
      _id: 4,
      Genre: {
        Name: "Comedy",
        Description:
          "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.",
      },
      Director: {
        Name: "Edgar Wright",
        Bio: "Edgar Howard Wright is an English filmmaker. He is known for his fast-paced and kinetic, satirical genre films, which feature extensive utilisation of expressive popular music, Steadicam tracking shots, dolly zooms and a signature editing style that includes transitions, whip pans and wipes.",
        Birth: "1974",
        Death: "",
      },
      //      _id: "64b732cb3fd2ea89f687c6c2",
      Title: "Hot Fuzz",
      Description:
        "Hot Fuzz is a 2007 action comedy film directed by Edgar Wright and written by Wright and Simon Pegg. Starring Pegg, Nick Frost, Timothy Dalton, and Jim Broadbent, the film centres on two police officers investigating a series of mysterious and gruesome deaths in a West Country village.",
      ImagePath:
        "https://m.media-amazon.com/images/I/51FWTjrYAUL._AC_UF894,1000_QL80_.jpg",
      Featured: true,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty :(</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};