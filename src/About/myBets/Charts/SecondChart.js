import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SecondChart(props) {
  const [fCoin, setfCoin] = useState(null);
  const [fCoinName, setfCoinName] = useState('');

  console.log(props.SelectedBet.data.Coin);

  //Que si es etherum se setee etherum

  const ForCoin = () => {
    if (props.SelectedBet.data.Coin === "BitCoin") {
      setfCoin(props.PriceBitcoin);
      setfCoinName('BitCoin')
    } else {
      setfCoin(3000);
      setfCoinName('Etherum')
    }
  };
  useEffect(() => {
    ForCoin();
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Comparing values",
      },
    },
  };

  const Coin = [fCoin];
  const Bet = [props.SelectedBet.data.CoinBet];
  const labels = ["January"];

  const data = {
    labels,
    datasets: [
      {
        label: fCoinName,
        data: Coin,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Your Bet",
        data: Bet,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} height={20} width={30} />;
}
