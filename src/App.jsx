import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./assets/css/style.min.css";
import "./App.css";
import MyMain from "./components/MyMain";
import MyNavbar from "./components/MyNavbar";

function App() {
  const [valueSearched, setValueSearched] = useState(null);
  const [location, setLocation] = useState(null);

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
              <MyMain valueToSearch={valueSearched} handleLocation={handleLocation} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
