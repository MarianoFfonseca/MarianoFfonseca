import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import db from "../../../firebase";
import { useState, useEffect } from "react";
export default function InfoBet(props) {
  //Consegir todas las apuestas
  const betLotery = () => {
    props.AllBets &&
      props.AllBets.map((bet) => {
        if (props.SelectedBet.data.Coin === bet.data.Coin && props.SelectedBet.data.Money === bet.data.Money && props.SelectedBet.data.Day === bet.data.Day) {
          let value = bet.data.CoinBet;
          let fValue = parseInt(value);
          setnUsersBet((nUsersBet) => [...nUsersBet, fValue]);
        }
      });
  };

  //Conseguir la info de mi apuesta LISTO
  //Consegir lo usuarios LISTO
  //Consegir el precio total LISTO
  //Consegir el promedio de la apuesta =>
  //La cantidad de apuestas o sea usuarios LISTO
  //Lo que apostaron estos usuarios

  const [nUsersBet, setnUsersBet] = useState([]);
  let sum = 0;
  

  for (let i = 0; i < nUsersBet.length; i++) {
    sum += nUsersBet[i];
  }

  const nUsers = nUsersBet.length;
  let AverageBet = sum / nUsers;
  
  const FinalAward = props.SelectedBet.data.Money * nUsers
 
  useEffect(() => {
    betLotery();
  }, []);

  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{ textAlign: "center", boxShadow: "50px" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Basic Info
        </Typography>
        <Typography variant="h3" component="div">
          Information of the Bet
        </Typography>
        <div style={{ margin: 30, textAlign: "center" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              gridTemplateRows: "auto",
              gridTemplateAreas: `"header header header header"
  "main main sidebar sidebar"
  "footer footer footer footer"`,
            }}
          >
            <Box sx={{ gridArea: "main" }}>
              <div>
                <h1>Users</h1>

                <h3>{nUsers}</h3>
              </div>
            </Box>
            <Box sx={{ gridArea: "sidebar" }}>
              <div>
                <h1>Total Award</h1>

                <h3>${FinalAward}</h3>
              </div>
            </Box>
            <Box sx={{ gridArea: "footer" }}>
              <div>
                <h1>Average bet</h1>

                <h3>{AverageBet}</h3>
              </div>
            </Box>
          </Box>
        </div>
        <Typography variant="body2"></Typography>
      </CardContent>
    </Card>
  );
}
