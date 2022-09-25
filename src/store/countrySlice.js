import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    searchValue: "",
    loading: true,
    showButton: false,
    singleCountry: {
      capital: "",
      name: { common: "", official: "" },
      flag: "",
      weather: "",
      weatherIcon: "",
      coatOfArms: "",
      countryNews: require("../components/sampleAPI.json"),
      countryText: "",
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
    },
    setWeather(state, action) {
      state.singleCountry.weather = action.payload;
    },
    setNewsAPI(state, action) {
      state.singleCountry.countryNews = action.payload;
      console.log(action.payload);
    },
    setCountryText(state, action) {
      state.singleCountry.countryText = action.payload;
    },
    setShowButton(state, action) {
      state.showButton = action.payload;
    },
  },
});

export const {
  getData,
  searchFilter,
  setLoading,
  getDataSingle,
  setWeather,
  setCountryText,
  setNewsAPI,
  setShowButton,
} = countrySlice.actions;
export const countriesData = (state) => state.countries.countries;
export const searchValue = (state) => state.countries.searchValue;
export const loadingValue = (state) => state.countries.loading;
export const showButton = (state) => state.countries.showButton;

export const singleCountry = (state) => state.countries.singleCountry;
export const weatherIcon = (state) => {
  try {
    if (state.countries.singleCountry.weather.weather[0].icon)
      return state.countries.singleCountry.weather.weather[0].icon;
    else return "10d";
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const countryWikiText = (state) =>
  state.countries.singleCountry.countryText;
export const countryNews = (state) => state.countries.singleCountry.countryNews;

export default countrySlice.reducer;
