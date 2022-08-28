import React from "react";
import { Card, CardHeader, CardBody } from "grommet";
import { Link } from "react-router-dom";
import "../css/singleCard.css";

const CardSingle = ({
  population,
  languages,
  currencies,
  name,
  flags,
  ccn3,
}) => {
  return (
    <Card className="card" width="22em" margin="0.5em">
      <CardHeader direction="column" className="cardHeader">
        <div className="cardFlagContainer">
          <img className="cardFlag" src={flags?.svg} alt={name?.common} />
        </div>
        <div className="cardName">
          <h2>{name?.common}</h2>
          <p>{name?.official}</p>
        </div>
      </CardHeader>
      <CardBody direction="row" className="cardBody">
        {" "}
        <div className="language">
          <h3>Languages</h3>
          <div className="infoBox">
            {languages &&
              Object.values(languages).map((key) => <li key={key}>{key}</li>)}
          </div>
        </div>
        <div className="currency">
          <h3>Currency</h3>
          <div className="infoBox">
            {currencies &&
              Object.values(currencies).map((currency, key) => (
                <li key={key}>{currency.name}</li>
              ))}
          </div>
        </div>
        <div className="population">
          <h3>Population</h3>
          <div className="infoBox">
            <li>{population}</li>
          </div>
        </div>
      </CardBody>
      <footer className="cardFooter">
        <Link to={`${ccn3}`}>See more!</Link>
      </footer>
    </Card>
  );
};

export default CardSingle;
