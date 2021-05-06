import React, { useState } from "react";

const Countries = () => {
  const [data, setData] = useState("Hello");

  const sayGoodbye = () => {
    setData("Goodbye");
  };

  return (
    <div>
      {data}
      <button onClick={sayGoodbye}>Dire au revoir</button>
    </div>
  );
};

export default Countries;
