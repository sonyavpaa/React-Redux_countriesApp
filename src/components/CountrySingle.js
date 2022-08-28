import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/singleCountry.css";

const CountrySingle = () => {
  const { name } = useParams();
  const [country, setCountry] = useState();
  const [flag, setFlag] = useState();
  const [coat, setCoat] = useState();
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState();
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/alpha/" + name)
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setCountry(res?.data);
        setFlag(res?.data[0]?.flags.svg);
        setCoat(res?.data[0]?.coatOfArms?.svg);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${res?.data[0]?.capital}&units=metric&appid=` +
              "fb50cf639c1d62c4d1f519bfd8bacb5c"
          )
          .catch((err) => {
            console.log(err);
            setLoading(false);
          })
          .then((response) => {
            setWeather(response?.data);
            setLoading(false);
          });
      });
    setWeatherIcon(weather?.weather[0]?.icon);
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <React.Fragment>
      {/* {console.log(weather?.weather[0].description)} */}
      <div>
        <h1>{country[0]?.name.common}</h1>
        <p>{country[0]?.name.official}</p>
        <img
          src={
            weatherIcon
              ? `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
              : `http://openweathermap.org/img/wn/10d@2x.png`
          }
          alt={weather?.main}
        />
        <p>Weather today: {weather?.weather[0].description} </p>
      </div>
      <div className="cardFlag">
        <img
          className="flagSingle"
          src={country[0]?.flags.svg}
          alt={country[0]?.name.common}
        />
      </div>
      <div className="weather"></div>
      <div className="mainSingle">
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </React.Fragment>
  );
};

export default CountrySingle;
