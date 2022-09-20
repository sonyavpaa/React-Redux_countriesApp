import { useEffect } from "react";
import React from "react";

import "../css/style.css";
import CardSingle from "./CardSingle";

import {
  searchFilter,
  searchValue,
  loadingValue,
  setLoading,
} from "../store/countrySlice";

import { favListData } from "../store/favouritesSlice";

import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  const favList = useSelector(favListData);
  const search = useSelector(searchValue);
  const loading = useSelector(loadingValue);

  // const [countries, setCountries] = useState([]);
  // const [search, setSearch] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    dispatch(searchFilter(e.target.value));
  };

  const filteredCountries = () => {
    // return favList;
    if (search === "") {
      return favList;
    }
    return favList.filter((country) => {
      return country.nameCommon.toLowerCase().includes(search.toLowerCase());
    });
  };

  //   const fetchCountries = async () => {
  //     await axios
  //       .get("https://restcountries.com/v3.1/all")
  //       .catch((error) => console.log(error))
  //       .then((res) => dispatch(getData(res.data)));
  //   };

  useEffect(() => {
    dispatch(setLoading(true));
    // fetchCountries();
    dispatch(setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <h1>Favourites</h1>
      <div>
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
                // {...country}
                population={country.population}
                languages={country.languages}
                currencies={country.currencies}
                nameCommon={country.nameCommon}
                nameOfficial={country.nameOfficial}
                link={country.nameCommon}
                flag={country.flag}
                state={country}
              />
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default List;
