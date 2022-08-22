import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./style.css";
import CardSingle from "./CardSingle";

const List = () => {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
    const countryData = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(countryData.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchCountries();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <input
        className="searchBar"
        type="search"
        onChange={handleSearch}
        value={search}
        placeholder=" Search a country..."
      />
      <ul className="list">
        {filteredCountries().map((country) => {
          return (
            <CardSingle
              key={country.name.common}
              nameCommon={country.name.common}
              nameOfficial={country.name.offcial}
              flagSvg={country.flags.svg}
              languages={country.languages}
              currencies={country.currencies}
              population={country.population}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default List;
