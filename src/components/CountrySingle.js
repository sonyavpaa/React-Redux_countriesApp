import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/singleCountry.css";

import {
  getDataSingle,
  singleCountry,
  setWeather,
  weatherIcon,
  setWeatherIcon,
} from "../store/countrySlice";

import { useDispatch, useSelector } from "react-redux";

const CountrySingle = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const country = useSelector(singleCountry);
  const weathericon = useSelector(weatherIcon);
  const [countryText, setCountryText] = useState();
  const [loading, setLoading] = useState(true);

  const [showButton, setShowButton] = useState(false);

  /////////////////// getData()
  // "https://restcountries.com/v3.1/alpha/"

  const getData = async () => {
    await axios
      .get(" https://restcountries.com/v3.1/name/" + name)
      .catch((error) => {
        console.log("problem with axios getting singleCountry data", error);
      })
      .then((res) => {
        if (name === "Georgia") return dispatch(getDataSingle(res?.data[1]));
        dispatch(getDataSingle(res?.data[0]));
      });
  };

  /////////////////// getData() end

  /////////////////// getWeather()

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

  /////////////////// getWeather() end

  ////////////////// getNews()

  const [newsApi, setNewsApi] = useState(require("./sampleAPI.json").results);
  const getNews = async () => {
    /////////////////// UNCOMMENT THIS AREA WHEN YOU WANT TO FETCH ARTICLES FROM newsdata.io
    // await axios
    //   .get(
    //     `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_API_KEY}=${name}`
    //   )
    //   .catch((err) => console.log("Error: ", err))
    //   .then((res) => {
    //     setNewsApi(res?.data?.results);
    //   });
  };

  // pub_11432a8798aee6ca02df9f5c3aa00a59940f4&q

  /////////////////// getNews() end

  /////////////////// getText()

  const getText = async () => {
    await axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${name}&prop=extracts&exintro&explaintext&origin=*`
      )
      .catch((err) => {
        console.log("Error:", err);
      })
      .then(async (res) => {
        try {
          let objectKey = Object.keys(res.data.query.pages)[0];
          let extract = res.data.query.pages[objectKey].extract;
          // if the search results is shorter, the search is made with '_country' added, for example country Georgia needs this because Wikipedia has several articles under the title Georgia
          if (extract.length < 500 || name === "Georgia") {
            try {
              await axios
                .get(
                  `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${name}_(country)&prop=extracts&exintro&explaintext&origin=*`
                )
                .catch((err) => console.log("Error:", err))
                .then((res) => {
                  objectKey = Object.keys(res.data.query.pages)[0];
                  console.log(res.data.query.pages[objectKey]);
                  return (extract = res.data.query.pages[objectKey].extract);
                });
            } catch (err) {
              console.log(
                "Error with getting a wikipedia text with '_country'"
              );
            }
          }
          let split = extract.split("\n");
          setCountryText(split);
        } catch (err) {
          console.log("Error with getting wikipedia text", err);
        }
      });
  };

  /////////////////// getText() end

  /////////////////// getIcon()

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

  /////////////////// getIcon() end

  useEffect(() => {
    getData();
    getWeather(country);
    getNews();
    getText(country.name.common, country.name.official);
    getIcon(country);
    if (country) {
      setLoading(false);
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  if (loading) {
    return <p>loading...</p>;
  } else if (country?.weather && countryText) {
    return (
      <React.Fragment>
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            &#8679;
          </button>
        )}
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
              else return;
            })}
            <div className="weather">
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
            <Link className="goBackButton" to="/">
              &#x2190;
            </Link>
          </div>

          <div className="right">
            <div className="wikiText">
              {countryText.map((p, index) => {
                return <p key={index}>{p}</p>;
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else if (countryText) {
    return (
      <React.Fragment>
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            &#8679;
          </button>
        )}
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
            <Link className="goBackButton" to="/">
              &#x2190;
            </Link>
          </div>
          <div className="right">
            <div className="wikiText">
              {countryText.map((p, index) => {
                return <p key={index}>{p}</p>;
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            &#8679;
          </button>
        )}
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
            <Link className="goBackButton" to="/">
              &#x2190;
            </Link>
          </div>
          <div className="right"></div>
        </div>
      </React.Fragment>
    );
};

export default CountrySingle;
