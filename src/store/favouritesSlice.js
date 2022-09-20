import { createSlice, current } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: localStorage.favourites
      ? JSON.parse(localStorage.favourites).favourites
      : [],
  },
  reducers: {
    addFavourite: (state, action) => {
      if (!current(state.favourites).includes(action.payload)) {
        state.favourites.push(action.payload);
      }
    },

    deleteFavourite: (state, action) => {
      const newArr = current(state.favourites).filter(
        (item) => item.nameCommon !== action.payload.nameCommon
      );
      state.favourites = newArr;
    },
  },
});

export const { addFavourite, deleteFavourite } = favouritesSlice.actions;
export const favListData = (state) => state.favourites.favourites;
// export const favListData = () => JSON.parse(localStorage.getItem("favourites"));

export default favouritesSlice.reducer;
