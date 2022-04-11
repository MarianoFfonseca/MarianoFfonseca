import React, { useEffect, useState } from "react";

function GetCryptoValues() {
  const [letr, setLet] = useState([]);
  let letras = ["b", "a", "b", "c", "d"];
  const result = letr.sort()
  useEffect(() => {
    setLet([letras[0]]);
  }, []);
  useEffect(() => {
    if (letr.length >= 1) {
      letras.map((element) => {
        const If = letr.some((x) => x === element);
        if (If === false) {
          setLet((letr) => [...letr, element]);
        }
      });
    }
  }, [letr]);

  console.log(result, 'soy el resultado')




  return <div></div>;
}

export default GetCryptoValues;
