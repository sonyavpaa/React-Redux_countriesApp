import { useEffect, useState } from "react";
import React from "react";
import Card from "./Card";
import axios from "axios";
import "./style.css";

const List = (props) => {
  const [countries, setCountries] = useState([]);
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
        type="search"
        onChange={handleSearch}
        value={search}
        placeholder="Search country..."
      />
      <ul className="list">
        {filteredCountries().map((country) => {
          return (
            <Card
              key={country.name}
              name={country.name.common}
              desc={country.name.official}
              languages={country.languages}
              currency={country.currencies}
              population={country.population}
              flagUrl={country.flags.svg}
            ></Card>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
