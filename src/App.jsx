import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/style.min.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div> KEK</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
