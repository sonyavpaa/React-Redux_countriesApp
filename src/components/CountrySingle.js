import axios from "axios";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/singleCountry.css";

import {
  getDataSingle,
  singleCountry,
  setWeather,
  weatherIcon,
  loadingValue,
  showButton,
  setLoading,
  setCountryText,
  countryWikiText,
  setNewsAPI,
  countryNews,
  setShowButton,
} from "../store/countrySlice";

import { useDispatch, useSelector } from "react-redux";

const CountrySingle = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const country = useSelector(singleCountry);
  const weathericon = useSelector(weatherIcon);
  const loading = useSelector(loadingValue);
  const countryText = useSelector(countryWikiText);
  const newsApi = useSelector(countryNews);
  const showButtonScroll = useSelector(showButton);

  /////////////////// getData()

  const getData = async () => {
    await axios
      .get("https://restcountries.com/v3.1/name/" + name)
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

  const getWeather = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country?.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY_WEATHER}`
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

  const getNews = async () => {
    /////////////////// UNCOMMENT THIS AREA WHEN YOU WANT TO FETCH ARTICLES FROM newsdata.io
    await axios;
    // .get(
    //   `https://newsapi.org/v2/everything?q=${name}&apiKey=${process.env.REACT_APP_API_KEY_NEWS}`
    // )
    // .catch((err) => console.log("Error: ", err))
    // .then((res) => {
    //   dispatch(setNewsAPI(res?.data));
    // });
  };

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

                  return (extract = res.data.query.pages[objectKey].extract);
                });
            } catch (err) {
              console.log(
                "Error with getting a wikipedia text with '_country'"
              );
            }
          }
          let split = extract.split("\n");
          // filters the empty paragraphs out
          const filtered = split.filter((p) => p !== "");
          dispatch(setCountryText(filtered));
        } catch (err) {
          console.log("Error with getting wikipedia text", err);
        }
      });
  };

  /////////////////// getText() end

  useEffect(() => {
    getData();
    getWeather();
    getNews();
    getText();
    if (country) {
      dispatch(setLoading(false));
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        dispatch(setShowButton(true));
      } else {
        dispatch(setShowButton(false));
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
  } else if (country?.weather && countryText && newsApi) {
    return (
      <React.Fragment>
        {showButtonScroll && (
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
            src={
              country?.coatOfArms
                ? country?.coatOfArms
                : require("../images/transpanet_square.png")
            }
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
            {newsApi.articles.map((article, index) => {
              if (index < 3)
                return (
                  <a
                    href={article?.url}
                    key={index}
                    style={{ marginBottom: "4em" }}
                  >
                    <p>{article?.title}</p>
                  </a>
                );
            })}

            <div className="weather">
              <img
                src={
                  weathericon
                    ? `http://openweathermap.org/img/wn/${weathericon}@2x.png`
                    : `http://openweathermap.org/img/wn/10d@2x.png`
                }
                alt={country?.weather?.weather?.main}
              />

              <p>
                Weather today:{" "}
                <span style={{ color: "white" }}>
                  {" "}
                  {country?.weather?.weather[0]?.description}
                </span>
              </p>
            </div>
            <Link className="goBackButton" to="/">
              &#x2190;
            </Link>
          </div>

          <div className="right">
            <div className="wikiText">
              {countryText.map((p, index) => {
                if (index + 1 === countryText.length) {
                  return (
                    <p key={index}>
                      {p}{" "}
                      {
                        <a href={`https://en.wikipedia.org/wiki/${name}`}>
                          More in Wikipedia.
                        </a>
                      }
                    </p>
                  );
                }

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
        {showButtonScroll && (
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
            src={
              country?.coatOfArms
                ? country?.coatOfArms
                : require("../images/transpanet_square.png")
            }
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
            {newsApi.articles.map((article, index) => {
              if (index < 3)
                return (
                  <a
                    href={article?.url}
                    key={index}
                    style={{ marginBottom: "4em" }}
                  >
                    <p>{article?.title}</p>
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
                if (index + 1 === countryText.length) {
                  return (
                    <p key={index}>
                      {p}{" "}
                      {
                        <a
                          key={index + 1}
                          href={`https://en.wikipedia.org/wiki/${name}`}
                        >
                          More in Wikipedia.
                        </a>
                      }
                    </p>
                  );
                }

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
        {showButtonScroll && (
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
            src={
              country?.coatOfArms
                ? country?.coatOfArms
                : require("../images/transpanet_square.png")
            }
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

            {newsApi.articles.map((article, index) => {
              if (index < 3)
                return (
                  <a
                    href={article?.url}
                    key={index}
                    style={{ marginBottom: "4em" }}
                  >
                    <p>{article?.title}</p>
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
