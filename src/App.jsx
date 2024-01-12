import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./assets/css/style.min.css";
import "./App.css";
import MyMain from "./components/MyMain";
import MyNavbar from "./components/MyNavbar";
import DetailPage from "./components/DetailPage";

function App() {
  const [valueSearched, setValueSearched] = useState(null);

  function handleSearchSubmit(value) {
    setValueSearched(value);
    console.log(value);
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
        <Route
          path="/location/:location"
          element={
            <>
              <MyNavbar callbackSubmit={handleSearchSubmit} />
              <DetailPage location={valueSearched} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
