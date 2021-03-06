import * as React from "react";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { IMovie } from "../MovieContainer";
import arrowGrey from "../Icons/icon-arrow-grey.svg"
import emptyImagePng from "../Illustrations/illustration-empty-state.png"

//NB: this svg is black!!!!
// import imbdLogo from "../Logos/logo-imdb.svg"
import rottenTomatoes from "../Logos/logo-rotten-tomatoes.svg"

export const MoviePage = (props: { Movie: IMovie; GoBack: () => void }) => {
  const actors = props.Movie.Actors.split(",");
  const genre = props.Movie.Genre.split(",")
  const directors = props.Movie.Director.split(",")

  return (
    <Row>
      <Row style={{ marginBottom: 16 }}>
        <img src={arrowGrey} alt="logo" onClick={props.GoBack} style={{ cursor: "pointer" }} />
      </Row>

      <Row>
        <Col xs="auto" sm={8}>
          {props.Movie && (
            <>
              <Row>
                <Col sm={12}>
                  <div className="duration-rated">{props.Movie.Runtime + " • " + props.Movie.Year + " • "}
                    <span>R</span>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={12}>
                  <div className="bold-movie-title">{props.Movie.Title}</div>
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
                      value={props.Movie.Ratings.find(r => r.Source === "Internet Movie Database")?.Value ?? ""}
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
                      value={props.Movie.Ratings.find(r => r.Source === "Rotten Tomatoes")?.Value ?? ""}
                    />
                  </InputGroup>
                </div>
              </Row>

              <Row>
                <Col>
                  <p className="details-title">Plot</p>
                  <p style={{ color: "white" }}>{props.Movie.Plot}</p>
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
          <Image src={props.Movie?.Poster ?? emptyImagePng} fluid />
        </Col>
      </Row>
    </Row>
  );
}