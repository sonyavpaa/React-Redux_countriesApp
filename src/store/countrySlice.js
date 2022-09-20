import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    searchValue: "",
    loading: true,
    singleCountry: {
      capital: "",
      name: { common: "", official: "" },
      flag: "",
      weather: "",
      weatherIcon: "",
      coatOfArms: "",
    },
  },
  reducers: {
    getData: (state, action) => {
      state.countries = action.payload;
    },
    searchFilter(state, action) {
      state.searchValue = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    getDataSingle(state, action) {
      state.singleCountry.capital = action.payload?.capital[0];
      state.singleCountry.name.common = action.payload?.name.common;
      state.singleCountry.name.official = action.payload?.name.official;
      state.singleCountry.flag = action.payload?.flags.svg;
      state.singleCountry.coatOfArms = action.payload?.coatOfArms.svg;
      // console.log("payload", action.payload);
    },
    setWeather(state, action) {
      state.singleCountry.weather = action.payload;
    },
    setWeatherIcon(state, action) {
      state.singleCountry.weatherIcon = action.payload;
    },
  },
});

export const {
  getData,
  searchFilter,
  setLoading,
  getDataSingle,
  setWeather,
  setWeatherIcon,
} = countrySlice.actions;
export const countriesData = (state) => state.countries.countries;
export const searchValue = (state) => state.countries.searchValue;
export const loadingValue = (state) => state.countries.loading;
export const singleCountry = (state) => state.countries.singleCountry;
export const weatherIcon = (state) => state.countries.weatherIcon;

export default countrySlice.reducer;
