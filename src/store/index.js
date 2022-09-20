import { configureStore } from "@reduxjs/toolkit";

import countrySlice from "./countrySlice";
import favouritesSlice from "./favouritesSlice";

const store = configureStore({
  reducer: { countries: countrySlice, favourites: favouritesSlice },
});

let currentValue = store.getState().favourites;

store.subscribe(() => {
  let previousValue = currentValue;
  currentValue = store.getState().favourites;

  if (previousValue !== currentValue) {
    localStorage.setItem("favourites", JSON.stringify(currentValue));
  }
});

export default store;
