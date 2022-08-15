import React from "react";
import "./style.css";

const Card = ({ name, desc, languages, currency, population, flagUrl }) => {
  return (
    <div className="cardSingle">
      <div className="cardMain">
        <div className="cardName">
          <h2>{name}</h2>
          <p>{desc}</p>
        </div>
        <div className="cardFlag">
          <img src={flagUrl} alt={name} />
        </div>
      </div>
      <div className="cardFooter">
        <div className="language">
          <h3>Languages</h3>
          <>
            {languages && Object.values(languages).map((key) => <li>{key}</li>)}
          </>
        </div>
        <div className="currency">
          <h3>Currency</h3>
          <>
            {currency &&
              Object.values(currency).map((currency, key) => (
                <li>{currency.name}</li>
              ))}
          </>
        </div>
        <div className="population">
          <h3>Population</h3>
          <li>{population}</li>
        </div>
      </div>
    </div>
  );
};

export default Card;
