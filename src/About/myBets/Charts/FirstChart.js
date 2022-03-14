import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function FirstChart(props) {
  //Numbers of bets
  const nAllBets = props.AllBets.length;
  //Bets of this bet
  const betLotery = () => {
    props.AllBets &&
      props.AllBets.map((bet) => {
        if (
          props.SelectedBet.data.Coin === bet.data.Coin &&
          props.SelectedBet.data.Money === bet.data.Money &&
          props.SelectedBet.data.Day === bet.data.Day
        ) {
          let value = bet.data.CoinBet;
          let fValue = parseInt(value);
          setnUsersBet((nUsersBet) => [...nUsersBet, fValue]);
        }
      });
  };
  const [nUsersBet, setnUsersBet] = useState([]);
  const nThisBet = nUsersBet.length;
  const nNotThisBet = nAllBets - nUsersBet.length;
  const persentThisBet = (nThisBet * 100) / nAllBets;
  const persentNotThisBet = (nNotThisBet * 100) / nAllBets;
  let fPersentThisValue = parseInt(persentThisBet);
  let fPersentNotThisValue = parseInt(persentNotThisBet);

  useEffect(() => {
    betLotery();
  }, []);

  const data = {
    labels: [
      "Users in this bet %" + fPersentThisValue,
      "Users in other bets %" + fPersentNotThisValue,
    ],
    datasets: [
      {
        data: [nThisBet, nNotThisBet],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div  style={{marginLeft:'10%', position: "relative", height: "80%", width: "80%" }}>
      <Pie data={data} />
    </div>
  );
}
