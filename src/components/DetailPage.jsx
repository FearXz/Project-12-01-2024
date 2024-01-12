import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Gallery from "./Gallery";

function DetailPage(props) {
  const params = useParams();
  const navigate = useNavigate("/");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [coordinate, setCoordinate] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState(null);

  async function fetchCoordinate(city) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a31b5aaa825d20eec78f660c7a56e5f2`
      );

      if (response.ok) {
        const fetchedCoordinate = await response.json();
        if (fetchedCoordinate.length > 0) {
          console.log(fetchedCoordinate[0]);
          setCoordinate(fetchedCoordinate[0]);
        } else {
          navigate("/");
        }
      } else {
        setHasError(`Error during the request`);
        throw new Error(`Errore : ${response.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchLocation(coordinate) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&appid=a31b5aaa825d20eec78f660c7a56e5f2`
      );

      if (response.ok) {
        const fetchedLocation = await response.json();
        console.log(fetchedLocation);
        setLocation(fetchedLocation);
        setSelectedInterval(fetchedLocation.list[0]);
      } else {
        setHasError(`Error during the request`);
        throw new Error(`Errore : ${response.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCoordinate(params.location);
  }, [params.location]);

  useEffect(() => {
    if (coordinate) {
      fetchLocation(coordinate);
    }
  }, [coordinate]);
  function handleSetInterval(value) {
    setSelectedInterval(value);
  }
  return (
    <Container>
      {location && selectedInterval && (
        <Row>
          <Col className=" mb-5">
            <Row className=" justify-content-center">
              <Col xs={12} className=" d-flex justify-content-center">
                <h1>{location.city.name}</h1>
              </Col>
              <Col xs={12}>
                <h2>{selectedInterval.dt_txt}</h2>
              </Col>
              <Col xs={6}>
                <h2>Temperature</h2>
                <p>Media : {selectedInterval.main.temp}</p>
                <p>Minima : {selectedInterval.main.temp_min}</p>
                <p>Massina : {selectedInterval.main.temp_max}</p>
              </Col>
              <Col xs={6}>
                <h2>Weather</h2>
                <img
                  style={{ maxWidth: "50" }}
                  src={` https://openweathermap.org/img/wn/${selectedInterval.weather[0].icon}.png`}
                  alt="icon"
                />
                <p>{selectedInterval.weather[0].main}</p>
                <p>{selectedInterval.weather[0].description}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={12} className=" d-flex justify-content-center">
            <Row className=" gap-1 justify-content-center">
              <Gallery list={location} handleSetInterval={handleSetInterval} />
              {/*               {location.list.map((meteoInterval, index) => (
                <Col key={`interval-${index}`} xs={2} onClick={() => setSelectedInterval(meteoInterval)}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={` https://openweathermap.org/img/wn/${meteoInterval.weather[0].icon}@4x.png`}
                    />
                    <Card.Body>
                      <Card.Title>{meteoInterval.dt_txt}</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))} */}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default DetailPage;
