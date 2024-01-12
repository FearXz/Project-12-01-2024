import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyMain(props) {
  const [valueSearched, setValueSearched] = useState(null);
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    props.callbackSubmit(valueSearched);
    navigate(`/location/${valueSearched}`);
  }

  return (
    <Container>
      <Row>
        <Col xs={12} className=" text-center">
          <h1>LA TUA APP METEO PREFERITA</h1>
        </Col>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3 justify-content-center">
              <Col className=" mb-3" xs={12} lg={7}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label></Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Insert location"
                    name="search"
                    value={valueSearched}
                    onChange={(e) => setValueSearched(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} lg={6} className=" text-center">
                <Button variant="primary" className="mb-3" type="submit">
                  Search Location
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default MyMain;
