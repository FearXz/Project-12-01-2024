import React from "react";
import { useEffect, useState } from "react";
function DetailPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [coordinate, setCoordinate] = useState(null);
  const [location, setLocation] = useState(null);

  async function fetchCoordinate(city) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a31b5aaa825d20eec78f660c7a56e5f2`
      );

      if (response.ok) {
        const fetchedCoordinate = await response.json();
        console.log(fetchedCoordinate[0]);
        setCoordinate(fetchedCoordinate[0]);
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
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=a31b5aaa825d20eec78f660c7a56e5f2`
      );

      if (response.ok) {
        const fetchedLocation = await response.json();
        console.log(fetchedLocation);
        setLocation(fetchedLocation);
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
    if (props.location) {
      fetchCoordinate(props.location);
    }
  }, [props.location]);

  useEffect(() => {
    if (coordinate) {
      fetchLocation(coordinate);
    }
  }, [coordinate]);

  return <div>DetailPage</div>;
}

export default DetailPage;
