import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./assets/css/style.min.css";
import "./App.css";
import MyMain from "./components/MyMain";
import MyNavbar from "./components/MyNavbar";

function App() {
  const [valueSearched, setValueSearched] = useState("");

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
              <MyMain valueToSearch={valueSearched} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
