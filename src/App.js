import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/List";
import LayOut from "./pages/LayOut";

import CountrySingle from "./components/CountrySingle";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}></Route>
        <Route index element={<List />} />
        <Route path="/:name" element={<CountrySingle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
