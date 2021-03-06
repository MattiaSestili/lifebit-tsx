import * as React from "react";
import { Card, Col, Image, Row } from "react-bootstrap"
import { SearchForm, SearchToolbar } from "./SearchToolbar"
import { IMovie } from "../MovieContainer"
import emptyBgImagePng from "../Illustrations/illustration-empty-state@2x.png"
import likeIconSVG from "../Icons/icon-heart-grey.svg";

export const Home = (props: { Movie: IMovie; OnSearchMovie: (form: SearchForm) => void; OnMovieClicked: () => void }) => {
  const [isMouseOver, setMouseOver] = React.useState(false)
  const imageSrc = props.Movie?.Poster ?? emptyBgImagePng;

  return (
    <>
      <SearchToolbar SearchMovie={props.OnSearchMovie} />
      <Row>
        <Col xs={6} md={4}>
          {/* mouseover and mouseleave behave sometimes in a odd way. for this purpose should be good enough */}
          <div style={{ position: "relative", cursor: "pointer" }} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
            <Image src={imageSrc} rounded width={"100%"} />

            {isMouseOver &&
              (<Card style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, background: "#353f4c", opacity: 0.9 }}>
                <Card.Header style={{ border: 0 }}>
                  <img src={likeIconSVG} alt="icon" style={{ float: "right" }} />
                </Card.Header>
                <Card.Body style={{ marginTop: "20rem" }} onClick={props.OnMovieClicked}>
                  <Card.Title style={{ color: "white", fontFamily: "Roboto", fontSize: "20pt", fontWeight: "bold" }}>{props.Movie?.Title}</Card.Title>
                  <Card.Text style={{ color: "white", fontFamily: "Roboto", fontSize: "20pt", fontWeight: "bold" }}>{props.Movie?.Year}</Card.Text>
                </Card.Body>
              </Card>)}
          </div>
        </Col>
      </Row>
    </>
  )
}