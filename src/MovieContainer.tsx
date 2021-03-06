import * as React from "react";
import { Container, Jumbotron, Row } from "react-bootstrap";
import { Home } from "./Components/Home";
import { MoviePage } from "./Components/MoviePage";
import { SearchForm } from "./Components/SearchToolbar";
import whatsLogo from "./Logos/logo.svg"

interface IRating {
  Source: string,
  Value: string
}

interface IMovie {
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

export interface IMovieList {
  Movie: IMovie;
  Favorite: boolean
}

export const MovieContainer = () => {
  // this is based on the API that returns only one movie at the time. 
  // not familiar with this API so not sure if there is a way to get multiple movies.
  // in that case we will have an array of movie in the state.
  const [movieList, setMoviesList] = React.useState<IMovieList>(null);
  const [showMovieDetails, setMovieDetails] = React.useState(false)

  React.useEffect(() => {
    // API Key stored in a DB perhaps. Not exposed like below
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=1c354bb9&plot=full", { method: "GET" }).then(async value => {
      const data = await value.json();
      setMoviesList({ Movie: data, Favorite: false })
      // show a toast/alert for error catch from the Promise
    }).catch(reason => console.log(reason))
  }, []);

  const _searchMovie = (form: SearchForm) => {
    const url = "http://www.omdbapi.com/?apikey=1c354bb9&plot=full&t=" + form.Title + "&y=" + form.Year
    fetch(url).then(async data => {
      const d = await data.json();
      setMoviesList({ Movie: d, Favorite: false })
    })
  }

  const _addToFavorite = () => {
    setMoviesList({ ...movieList, Favorite: !movieList.Favorite })
  }

  let body = <Home Movie={movieList} OnSearchMovie={_searchMovie}
    OnMovieClicked={() => setMovieDetails(true)}
    // For some sort of persistence between the search we would need to have a way to store those values.
    // Mapping the favorite to the movie. perhaps one way would be with a DB Column
    AddToFavorite={_addToFavorite} />

  if (showMovieDetails) {
    body = <MoviePage MovieList={movieList} GoBack={() => setMovieDetails(false)} AddToFavorite={_addToFavorite} />
  }


  return (
    <Jumbotron fluid style={{ background: "#0a1014" }}>
      <Container>
        <Row style={{ marginBottom: 16 }}>
          <img src={whatsLogo} alt="logo" />
        </Row>

        {body}
      </Container>
    </Jumbotron>
  );
}