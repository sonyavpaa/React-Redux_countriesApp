import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/List";
import LayOut from "./pages/LayOut";

import { Provider } from "react-redux";
import store from "./store";

import CountrySingle from "./components/CountrySingle";
import Favourites from "./components/Favourites";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<List />}></Route>
            <Route path="/:name" element={<CountrySingle />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

{
  /* <Routes>
  <Route path="/" element={<LayOut />}>
    <Route index element={<Home />} />
    <Route path="pokelist" element={<PokeList />} />
    <Route path="pokelist/:pokesingle" element={<RouterWrapper />} />
    <Route path="favlist" element={<FavList />} />
    <Route path="about" element={<About />} />
  </Route>
</Routes>; */
}
