import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "grommet";
import { Link } from "react-router-dom";
import "../css/singleCard.css";

const CardSingle = (props) => {
  return (
    <Card className="card" width="22em" margin="0.5em">
      <CardHeader direction="column" className="cardHeader">
        <div className="cardFlagContainer">
          <img
            className="cardFlag"
            src={props.flagSvg}
            alt={props.nameCommon}
          />
        </div>
        <div className="cardName">
          <h2>{props.nameCommon}</h2>
          <p>{props.nameOfficial}</p>
        </div>
      </CardHeader>
      <CardBody direction="row" className="cardBody">
        {" "}
        <div className="language">
          <h3>Languages</h3>
          <div className="infoBox">
            {props.languages &&
              Object.values(props.languages).map((key) => (
                <li key={key}>{key}</li>
              ))}
          </div>
        </div>
        <div className="currency">
          <h3>Currency</h3>
          <div className="infoBox">
            {props.currencies &&
              Object.values(props.currencies).map((currency, key) => (
                <li key={key}>{currency.name}</li>
              ))}
          </div>
        </div>
        <div className="population">
          <h3>Population</h3>
          <div className="infoBox">
            <li>{props.population}</li>
          </div>
        </div>
      </CardBody>
      <footer className="cardFooter">
        <Link to={props.nameCommon}>See more!</Link>
      </footer>
    </Card>
  );
};

export default CardSingle;
