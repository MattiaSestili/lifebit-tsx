import * as React from "react";
import { Col, Form, FormControl, InputGroup } from "react-bootstrap";

import searchSvg from "../Icons/icon-magnifier-grey.svg"

export interface SearchForm {
  Title: string;
  Year: string;
}

export const SearchToolbar = (props: { SearchMovie: (searchForm: SearchForm) => void }) => {
  const [searchForm, setSearch] = React.useState<SearchForm>({
    Title: "",
    Year: "",

  })

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.SearchMovie(searchForm);
  }

  const _onFormChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...searchForm, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <Form onSubmit={_onSubmit}>
      <Form.Row className="align-items-center">
        <Col xs="auto" sm={12}>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text style={{ background: "white" }}>
                <img src={searchSvg} alt="logo" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className="search-bar-movies"
              name="Title"
              placeholder={"Search movies..."}
              value={searchForm.Title}
              onChange={_onFormChanged}
              style={{
                fontSize: "16px",
                fontFamily: 'Roboto',
                padding: "12px",
                height: "2.7rem"
              }}
            />
          </InputGroup>
        </Col>
      </Form.Row>
    </Form>

  )
}