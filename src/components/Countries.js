import React, { useState, useEffect } from "react"; //- This mandatory for connect API
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]); //- Stock data on the useState
  const [sortedData, setSortedData] = useState([]); //- Trier les data
  const [playOnce, setPlayOnce] = useState(true); //- Pour jouer 1 seul fois
  const [rangeValue, setRangeValue] = useState(40); //- limiter a 40 pays
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    if (playOnce) {
      axios // - Search data API and connect with GET (fetch)
        .get(
          "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag"
        )
        .then((res) => {
          setData(res.data); //- setData allow to transform the data
          setPlayOnce(false);
        });
    }
    //- this is Hooks

    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      //- Stock reasult on sortArray
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, rangeValue, playOnce]); //- Important you put this []-> Callback on the end .

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)} //- Change number country to see
        />
        <ul>
          {radios.map((radio) => {
            /* On map les elements */ /* Each time the continent is selected, the radio value change
             */
            return (
              <li key={radio}>
                <input
                  type="radio"
                  value={radio}
                  id="radio"
                  checked={radio === selectedRadio}
                  onChange={(e) => setSelectedRadio(e.target.value)} //- this is the method to select a checkbox on react
                />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && (
          <h5 onClick={() => setSelectedRadio("")}>Annuler recherche</h5> //- Annuler la recherche avec && func
        )}
      </div>
      <ul className="countries-list">
        {sortedData
          .filter((country) => country.region.includes(selectedRadio))
          .map((
            country //- integret data on the map (integred JS direct) ;// change on SortedData
          ) => (
            <Card country={country} key={country.name} /> //- Send data on the coponent Card with the Key, for each country on the map you send on the card component
          ))}
      </ul>
    </div>
  );
};

export default Countries;

//- This allow to change
// const Countries = () => {
//   const [data, setData] = useState("Hello");

//   const sayGoodbye = () => {
//     setData("Goodbye");
//   };
//   return (
//     <div>
//       {data}
//       <button onClick={sayGoodbye}>Dire au revoir</button>
//     </div>
//   );
// };
