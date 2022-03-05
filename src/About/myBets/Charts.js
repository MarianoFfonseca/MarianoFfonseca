  import React from "react";
import FirstChart from "./Charts/FirstChart";
import InfoBet from "./Charts/InfoBet";
import SecondChart from './Charts/SecondChart'
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
function Charts(props) {

  const [priceB, setPriceB] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://blockchain.info/ticker")
      .then((res) => res.json())
      .then((data) => { 
        setPriceB(data.USD.last); 
        setLoading(false);       
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);
  return (
    <div>
      <div style={{ marginTop: 30 }}>
        {props.Changed === true ? (
          <div>
            <InfoBet
              AllBets={props.AllBets}
              SelectedBet={props.SelectedBet}
              Changed={props.Changed}
            ></InfoBet>
            <div className="charts">
              <h1 style={{textAlign:'center', marginTop:'5%'}}>Formal Analisis</h1>
              <hr />
              <h3 style={{marginTop:'5%'}}>Users in this this bet</h3>
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
              <SecondChart
                  AllBets={props.AllBets}
                  SelectedBet={props.SelectedBet}
                  PriceBitcoin={priceB}
                ></SecondChart>
              </div>
            </Box>
            <Box sx={{ gridArea: "sidebar" }}>
              <div>
              <FirstChart
                  AllBets={props.AllBets}
                  SelectedBet={props.SelectedBet}
                ></FirstChart>
              </div>
            </Box>
            </Box>
            </div>
          </div>
        ) : (
          <p>Select one</p>
        )}
      </div>
    </div>
  );
}

export default Charts;
