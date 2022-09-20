import React from "react";
import { Card, CardHeader, CardBody } from "grommet";
import { Link } from "react-router-dom";
import "../css/singleCard.css";

import {
  addFavourite,
  deleteFavourite,
  favListData,
} from "../store/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";

const CardSingle = (props) => {
  const dispatch = useDispatch();
  const favList = useSelector(favListData);

  return (
    <Card className="card" width="22em" margin="0.5em">
      <CardHeader direction="column" className="cardHeader">
        <div className="cardFlagContainer">
          <img className="cardFlag" src={props.flag} alt={props.nameCommon} />
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
        <Link to={`/${props.ccn3}`}>See more!</Link>

        <button
          className="favButton"
          onClick={() =>
            favList.some((item) => item.nameCommon == props.nameCommon)
              ? dispatch(deleteFavourite(props))
              : dispatch(addFavourite(props))
          }
        >
          {favList.some((item) => item.nameCommon == props.nameCommon) ? (
            <span className="material-icons-outlined heart">favorite</span>
          ) : (
            <span className="material-icons-outlined heart">
              favorite_border
            </span>
          )}
        </button>
      </footer>
    </Card>
  );
};

export default CardSingle;
