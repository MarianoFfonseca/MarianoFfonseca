import React from "react";
import FirstChart from "./Charts/FirstChart";
import InfoBet from "./Charts/InfoBet";
function Charts(props) {
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
              <div
                class="chart-container"
                style={{
                  position: "relative",
                  height: "50%",
                  width: "45%",
                  margin: "2%",
                }}
              >
                <FirstChart
                  AllBets={props.AllBets}
                  SelectedBet={props.SelectedBet}
                ></FirstChart>
              </div>
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
