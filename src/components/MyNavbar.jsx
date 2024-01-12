import React, { useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function MyNavbar(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [valueSearched, setValueSearched] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.callbackSubmit(valueSearched);
    navigate(`/location/${valueSearched}`);
  }
  function handleSearch(event) {
    console.log(event.target.value);
    setValueSearched(event.target.value);
  }

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={NavLink} to={"/"}>
          METEO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          {params.location && (
            <Form inline="true" onSubmit={handleSubmit}>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    value={valueSearched}
                    onChange={handleSearch}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Search</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
