import React, { Component } from "react";
import "../css/singleCountry.css";

class CountrySingle extends Component {
  state = {
    data: [],
    latlng: [],
    isLoading: false,
    weatherIcon: [],
    weatherToday: "",
  };
  componentDidMount() {
    fetch(`https://restcountries.com/v3.1/name/${this.props.params.country}`)
      .then((response) => response.json())
      .then((response) => {
        // console.log("response: ", response[0]?.capitalInfo?.latlng);
        this.setState({
          data: response,
          latlng: response[0]?.capitalInfo?.latlng,
        });
        console.log(this.state.latlng);
        fetchWeather(this.state?.latlng[0], this.state?.latlng[1]);
      });

    const fetchWeather = (lat, lng) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=fb50cf639c1d62c4d1f519bfd8bacb5c`
      )
        .then((response) => response.json())
        .then((response) => {
          //   console.log("weather today:", response?.weather[0]?.description);
          this.setState({
            weatherIcon: response?.weather[0]?.icon,
            weatherToday: response?.weather[0]?.description,
          });
          // this.setState({ weather: response });
        });
    };
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>{this.state.data[0]?.name.common}</h1>
          <p>{this.state.data[0]?.name.official}</p>
          <img
            src={`http://openweathermap.org/img/wn/${this.state?.weatherIcon}@2x.png`}
            alt={this.state.weatherToday}
          />
          <p>Weather today: {this.state.weatherToday} </p>
          {console.log(this.state.weatherToday)}
        </div>
        <div className="cardFlag">
          <img
            className="flagSingle"
            src={this.state.data[0]?.flags.svg}
            alt={this.state.data[0]?.name.common}
          />
        </div>
        <div className="weather"></div>
        <div className="mainSingle">
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default CountrySingle;
