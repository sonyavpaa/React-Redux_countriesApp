import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/List";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
