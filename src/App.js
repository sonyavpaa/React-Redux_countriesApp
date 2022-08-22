import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import List from "./components/List";
import LayOut from "./pages/LayOut";

import CountrySingle from "./components/CountrySingle";

const RouterWrapper = (props) => {
  const params = useParams();
  return <CountrySingle params={params} {...props} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}></Route>
        <Route index element={<List />} />
        <Route path="/:country" element={<RouterWrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
