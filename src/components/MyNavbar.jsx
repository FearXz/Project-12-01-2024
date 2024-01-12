import React, { useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";

function MyNavbar(props) {
  const [valueSearched, setValueSearched] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.callbackSubmit(valueSearched);
  }
  function handleSearch(event) {
    console.log(event.target.value);
    setValueSearched(event.target.value);
  }

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="#link">Browse</Nav.Link>
          </Nav>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
