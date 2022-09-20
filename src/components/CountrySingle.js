import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/singleCountry.css";

import {
  getDataSingle,
  singleCountry,
  setWeather,
  getData,
  weatherIcon,
  setWeatherIcon,
} from "../store/countrySlice";

import { useDispatch, useSelector } from "react-redux";

const CountrySingle = () => {
  const newsApi = require("./sampleAPI.json").results;
  const [countryText, setCountryText] = useState();

  const getText = async (nameCommon, nameOfficial) => {
    let fetchWithName = await nameCommon;

    if (/\s/.test(nameCommon))
      fetchWithName = await nameOfficial.replaceAll(" ", "_");

    await axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${fetchWithName}&prop=extracts&exintro&explaintext&origin=*`
      )
      .then(async (res) => {
        let objectKey = Object.keys(res.data.query.pages)[0];

        // console.log(res.data.query.pages[objectKey].extract);
        await setCountryText(res.data.query.pages[objectKey].extract);
        console.log(countryText);
      });
  };

  // const [newsApi, setNewsApi] = useState();
  const getNews = async () => {
    // console.log(country.name.common);
    // if (country.name.common) {
    //   await axios
    //     .get(
    //       `https://newsdata.io/api/1/news?apikey=pub_11432a8798aee6ca02df9f5c3aa00a59940f4&q=${country.name.common}`
    //     )
    //     .catch((err) => console.log("Error: ", err))
    //     .then((res) => {
    //       console.log(res.data.results);
    //       setNewsApi(res.data.results);
    //     });
    // }
  };

  const dispatch = useDispatch();
  const country = useSelector(singleCountry);
  const weathericon = useSelector(weatherIcon);

  const { name } = useParams();

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await axios
      .get("https://restcountries.com/v3.1/alpha/" + name)
      .catch((error) => {
        console.log("problem with axios getting singleCountry data", error);
      })
      .then((res) => {
        dispatch(getDataSingle(res?.data[0]));
      });
  };

  const getWeather = async (country) => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country?.capital}&units=metric&appid=` +
          "fb50cf639c1d62c4d1f519bfd8bacb5c"
      )
      .catch((err) => {
        console.log("problem with axios getting weather data", err);
        setLoading(false);
      })
      .then((response) => {
        dispatch(setWeather(response?.data));
      });
  };

  const getIcon = async (country) => {
    try {
      await dispatch(
        setWeatherIcon(
          `http://openweathermap.org/img/wn/${country?.weather?.weather[0]?.icon}@2x.png`
        )
      );
    } catch (error) {
      console.log("problem witch axios fetching the icon:", error);
    }
  };

  useEffect(() => {
    getData();
    getWeather(country);
    getNews();
    getText(country.name.common, country.name.official);
    getIcon(country);

    setLoading(false);
  }, []);

  if (loading) {
    return <p>loading...</p>;
  } else if (country?.weather && newsApi) {
    getText(country.name.common, country.name.official);
    return (
      <React.Fragment>
        <div className="cardFlag">
          <img
            className="flagSingle"
            src={country?.flag}
            alt={country?.name.common}
          />
          <img
            className="coatOfArms"
            src={country?.coatOfArms}
            alt={country?.name.common}
          />
          <p>{country?.name.official}</p>
        </div>
        <div>
          <h1>{country?.name.common}</h1>
        </div>

        <div className="mainSingle">
          <div className="left">
            <h2>LATEST NEWS</h2>
            {newsApi.map((article, index) => {
              if (index < 3)
                return (
                  <a
                    href={article.link}
                    key={index}
                    style={{ marginBottom: "4em" }}
                  >
                    <p>{article.title}</p>
                  </a>
                );
            })}
          </div>

          <div className="right">
            <p>{countryText}</p>
            <img
              src={
                weathericon
                  ? `http://openweathermap.org/img/wn/${country?.weather?.weather[0]?.icon}@2x.png`
                  : `http://openweathermap.org/img/wn/10d@2x.png`
              }
              alt={country?.weather?.weather?.main}
            />
            <p>Weather today: {country?.weather?.weather[0]?.description}</p>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    getText(country.name.common, country.name.official);
    return (
      <React.Fragment>
        <div className="cardFlag">
          <img
            className="flagSingle"
            src={country?.flag}
            alt={country?.name.common}
          />
          <img
            className="coatOfArms"
            src={country?.coatOfArms}
            alt={country?.name.common}
          />
          <p>{country?.name.official}</p>
        </div>
        <div>
          <h1>{country?.name.common}</h1>
        </div>

        <div className="mainSingle">
          <div className="left">
            <h2>LATEST NEWS</h2>

            {newsApi.map((article, index) => {
              if (index < 3)
                return (
                  <a
                    href={article.link}
                    key={index}
                    style={{ marginBottom: "4em" }}
                  >
                    <p>{article.title}</p>
                  </a>
                );
            })}
          </div>
          <div className="right">{countryText}</div>
        </div>
      </React.Fragment>
    );
  }
};

export default CountrySingle;
