import * as React from "react";
import { Card, Col, Image, Row } from "react-bootstrap"
import { SearchForm, SearchToolbar } from "./SearchToolbar"
import { IMovieList } from "../MovieContainer"
import emptyBgImagePng from "../Illustrations/illustration-empty-state@2x.png"
import fullHeartIconSVG from "../Icons/icon-heart-full.svg";
import whiteHeartIconSVG from "../Icons/icon-heart-white.svg"

export const Home = (props: { Movie: IMovieList; OnSearchMovie: (form: SearchForm) => void; OnMovieClicked: () => void; AddToFavorite: () => void; }) => {
  const [isMouseOver, setMouseOver] = React.useState(false)
  const imageSrc = props.Movie?.Movie.Poster ?? emptyBgImagePng;

  return (
    <>
      <SearchToolbar SearchMovie={props.OnSearchMovie} />
      <Row>
        <Col xs={6} md={4}>
          {/* mouseover and mouseleave behave sometimes in a odd way. for this purpose should be good enough */}
          <div style={{ position: "relative", cursor: "pointer" }} onClick={props.OnMovieClicked} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
            <Image src={imageSrc} rounded width={"100%"} />

            {isMouseOver &&
              (<Card style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, background: "#353f4c", opacity: 0.9, padding: 12 }}>
                <Card.Header style={{ border: 0 }}>
                  <img src={props.Movie.Favorite ? fullHeartIconSVG : whiteHeartIconSVG} alt="icon" style={{ float: "right" }} onClick={e => { e.stopPropagation(); props.AddToFavorite() }} />
                </Card.Header>
                <Card.Body style={{ marginTop: "20rem" }}>
                  <Card.Title style={{ color: "white", fontFamily: "Roboto", fontSize: "20pt", fontWeight: "bold" }}>{props.Movie?.Movie.Title}</Card.Title>
                  <Card.Text style={{ color: "white", fontFamily: "Roboto", fontSize: "20pt", fontWeight: "bold" }}>{props.Movie?.Movie.Year}</Card.Text>
                </Card.Body>
              </Card>)}
          </div>
        </Col>
      </Row>
    </>
  )
}