import { useEffect } from "react";
import React from "react";
import axios from "axios";
import "../css/style.css";
import CardSingle from "./CardSingle";

import {
  getData,
  countriesData,
  searchFilter,
  searchValue,
  loadingValue,
  setLoading,
} from "../store/countrySlice";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  const countries = useSelector(countriesData);
  const search = useSelector(searchValue);
  const loading = useSelector(loadingValue);

  const handleSearch = (e) => {
    dispatch(searchFilter(e.target.value));
  };

  const filteredCountries = () => {
    if (search === "") {
      return countries;
    }
    return countries.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
  };

  const fetchCountries = async () => {
    await axios
      .get("https://restcountries.com/v3.1/all")
      .catch((error) => console.log(error))
      .then((res) => dispatch(getData(res?.data)));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    fetchCountries();
    dispatch(setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (countries) {
    return (
      <div>
        <h1>Countries</h1>
        <input
          className="searchBar"
          type="search"
          onChange={handleSearch}
          value={search}
          placeholder=" Search a country..."
        />
        <ul className="list">
          {filteredCountries().map((country, i) => {
            return (
              <CardSingle
                key={i}
                population={country.population}
                languages={country.languages}
                currencies={country.currencies}
                nameCommon={country.name.common}
                nameOfficial={country.name.official}
                link={country.name.common}
                flag={country.flags.svg}
                state={country}
              />
            );
          })}
        </ul>
      </div>
    );
  }
};

export default List;
