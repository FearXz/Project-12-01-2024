import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./assets/css/style.min.css";
import "./App.css";
import MyMain from "./components/MyMain";
import MyNavbar from "./components/MyNavbar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [valueSearched, setValueSearched] = useState(null);
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
    if (valueSearched) {
      fetchCoordinate(valueSearched);
    }
  }, [valueSearched]);

  useEffect(() => {
    if (coordinate) {
      fetchLocation(coordinate);
    }
  }, [coordinate]);

  function handleSearchSubmit(value) {
    setValueSearched(value);
    console.log(value);
  }

  function handleLocation(locationObj) {
    setLocation(locationObj);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MyNavbar callbackSubmit={handleSearchSubmit} />
              <MyMain callbackSubmit={handleSearchSubmit} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
