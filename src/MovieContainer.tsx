import * as React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { Home } from "./Components/Home";
import { MoviePage } from "./Components/MoviePage";
import { SearchForm } from "./Components/SearchToolbar";

interface IRating {
  Source: string,
  Value: string
}

export interface IMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings: IRating[]
}

export const MovieContainer = () => {
  // this is based on the API that returns only one movie at the time. 
  // not familiar with this API so not sure if there is a way to get multiple movies.
  // in that case we will have an array of movie in the state.
  const [movie, setMovies] = React.useState<IMovie>(null);
  const [showMovieDetails, setMovieDetails] = React.useState(false)

  React.useEffect(() => {
    // API Key stored in a DB perhaps. Not exposed like below
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=1c354bb9&plot=full", { method: "GET" }).then(async value => {
      const data = await value.json();
      setMovies(data)
      // show a toast/alert for error catch from the Promise
    }).catch(reason => console.log(reason))
  }, []);

  const _searchMovie = (form: SearchForm) => {
    const url = "http://www.omdbapi.com/?apikey=1c354bb9&plot=full&t=" + form.Title + "&y=" + form.Year
    fetch(url).then(async data => {
      const d = await data.json();
      setMovies(d)
    })
  }

  let body = <Home Movie={movie} OnSearchMovie={_searchMovie} OnMovieClicked={() => setMovieDetails(true)} />
  if (showMovieDetails) {
    body = <MoviePage Movie={movie} GoBack={() => setMovieDetails(false)} />
  }


  return (
    <Jumbotron fluid style={{ background: "#0a1014" }}>
      <Container>
        {body}
      </Container>
    </Jumbotron>
  );
}