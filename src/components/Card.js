import React from "react";

const Card = (props) => {
  const { country } = props;

  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); //-Separateur de millier
  };

  return (
    <li className="card">
      <img src={country.flag} alt="flag" />
      <div className="data-container">
        <ul>
          <li>{country.name}</li>
          <li>{country.capital}</li>
          <li>Pop. {numberFormat(country.population)}</li>
        </ul>
      </div>
    </li>
  );
};

export default Card;

// const Card = (props) => {
//   const { country } = props; // Send to data(API) on Card with props , DDo destructuring {country} = pops
//   console.log(country);

//   return (
//     <li className="card">
//       <img src={country.flag} alt="flag" />
//       <div className="data-container">
//         <ul>
//           <li>{country.name}</li>
//           <li>{country.capital}</li>
//           <li>{country.population}</li>
//         </ul>
//       </div>
//     </li>
//   );
// };
