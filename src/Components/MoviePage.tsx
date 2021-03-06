import * as React from "react";
import { Button, ButtonGroup, Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { IMovieList } from "../MovieContainer";
import arrowGrey from "../Icons/icon-arrow-grey.svg"
import emptyImagePng from "../Illustrations/illustration-empty-state.png"
import heartGreySVG from "../Icons/icon-heart-grey.svg"
import fullHeartSVG from "../Icons/icon-heart-full.svg"

//NB: this svg is black!!!!
// import imbdLogo from "../Logos/logo-imdb.svg"
import rottenTomatoes from "../Logos/logo-rotten-tomatoes.svg"

export const MoviePage = (props: { MovieList: IMovieList; GoBack: () => void; AddToFavorite: () => void }) => {
  const actors = props.MovieList.Movie.Actors.split(",");
  const genre = props.MovieList.Movie.Genre.split(",")
  const directors = props.MovieList.Movie.Director.split(",")

  return (
    <Row>
      <Col sm={12}>
        <Row style={{ marginBottom: 16 }}>
          <img src={arrowGrey} alt="logo" onClick={props.GoBack} style={{ cursor: "pointer" }} />
        </Row>

        <Row>
          <Col xs="auto" sm={8}>
            {props.MovieList && (
              <>
                <Row>
                  <Col sm={12}>
                    <div className="duration-rated">{props.MovieList.Movie.Runtime + " • " + props.MovieList.Movie.Year + " • "}
                      <span>R</span>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col sm={12}>
                    <div className="bold-movie-title">{props.MovieList.Movie.Title}</div>
                  </Col>
                </Row>

                <Row>
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend className="rating">
                        <InputGroup.Text className="imdb">IMDb</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        style={{
                          width: "4rem",
                          background: "transparent",
                          fontFamily: 'Roboto',
                          color: "white",
                          borderColor: "#1b2329",
                          padding: 8
                        }}
                        readOnly={true}
                        value={props.MovieList.Movie.Ratings.find(r => r.Source === "Internet Movie Database")?.Value ?? ""}
                      />
                    </InputGroup>
                  </div>

                  <div style={{ marginLeft: 16 }}>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend className="rating">
                        <InputGroup.Text className="rotten-tomatoes"><img src={rottenTomatoes} alt="logo" /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        style={{
                          width: "4rem",
                          background: "transparent",
                          fontFamily: 'Roboto',
                          color: "white",
                          borderColor: "#1b2329",
                          padding: 8
                        }}
                        readOnly={true}
                        value={props.MovieList.Movie.Ratings.find(r => r.Source === "Rotten Tomatoes")?.Value ?? ""}
                      />
                    </InputGroup>
                  </div>

                  <ButtonGroup className="btn-favorite">
                    {props.MovieList.Favorite ?
                      <Button className="dark-favorite-btn-active" onClick={props.AddToFavorite}>
                        <img src={fullHeartSVG} alt="icon" /> &nbsp;&nbsp;Added
                  </Button>
                      : <Button className={"dark-favorite-btn"} variant="outline-dark" onClick={props.AddToFavorite}>
                        <img src={heartGreySVG} alt="icon" /> &nbsp;&nbsp; Add to favorite
                  </Button>}
                  </ButtonGroup>
                </Row>

                <Row>
                  <Col>
                    <p className="details-title">Plot</p>
                    <p style={{ color: "white" }}>{props.MovieList.Movie.Plot}</p>
                  </Col>
                </Row>

                <Row>
                  <Col sm={4}>
                    <p className="details-title">Cast</p>
                    {actors.map(y => (
                      <React.Fragment key={y}>
                        <div style={{
                          width: "10rem",
                          background: "transparent",
                          color: "white"
                        }}>{y}</div>
                      </React.Fragment>))}
                  </Col>

                  <Col sm={4}>
                    <p className="details-title"> Genre </p>
                    {genre.map(y => (
                      <React.Fragment key={y}>
                        <div style={{
                          width: "10rem",
                          background: "transparent",
                          color: "white"
                        }}>{y}</div>
                      </React.Fragment>))}
                  </Col>

                  <Col sm={4}>
                    <p className="details-title"> Directors </p>
                    {directors.map(y => (
                      <React.Fragment key={y}>
                        <div style={{
                          width: "10rem",
                          background: "transparent",
                          color: "white"
                        }}>{y}</div>
                      </React.Fragment>))}
                  </Col>
                </Row>
              </>)}
          </Col>

          <Col xs="auto" sm={4}>
            <Image src={props.MovieList?.Movie.Poster ?? emptyImagePng} width={"100%"} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}