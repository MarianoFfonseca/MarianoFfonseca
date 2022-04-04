import * as React from "react";
import { motion } from "framer-motion";
import { Link, Redirect } from "react-router-dom";
import db from "../../firebase";
import LiForOptions from "./LiForOptions";
import "./SelectOptionsBet.css";
//Firebase
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ButtonCheckOutOptions from "./ButtonCheckOutOptions";
export default function SelectOptionsBet({
  canJoin,
  canJoinBet,
  setSelectedSocialOptions,
  selectedSocialOption,
  selectedCoinSocialBet,
  setSelectedCoinSocialBet,
  setIndividualBetPrice
}) {
  const { id } = useParams();
  const socialOptions = () => {
    db.collection("socialOptions")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setOptions((options) => [...options, data]);
        });
      });
  };
  const [options, setOptions] = useState([]);
  const [isIn, setIsIn] = useState(false);
  useEffect(() => {
    socialOptions();
  }, []);

  //Para el check out
  const Button = (Price, opcionElegida) => {
    console.log(Price)
    return <ButtonCheckOutOptions Price={Price} selectedOption={opcionElegida} documentId={id}></ButtonCheckOutOptions>;
  };

  const Check = () => {
    const f = options.map((x) => {
      if (x.id === id) {
        if (x.State === "Private") {
         
             if (canJoin === true && canJoinBet === id) {
              setIndividualBetPrice(x.Price)
              var LiClass1 = x.Option1 === selectedSocialOption ? "active" : "";
            var LiClass2 = x.Option2 === selectedSocialOption ? "active" : "";
            var LiClass3 = x.Option3 === selectedSocialOption ? "active" : "";
            var LiClass4 = x.Option4 === selectedSocialOption ? "active" : "";
            console.log(LiClass1, LiClass2);
            return (
              <motion.div
                transition={{ type: "spring", duration: 2 }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="selectOptions_card"
              >
                <h3>Select the options for this bet</h3>
                <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
                  - Info
                </p>
                {x.NOptions === "2" ? (
                  <>
                    <li>
                      {" "}
                      <span
                        className={LiClass1}
                        onClick={() => setSelectedSocialOptions(x.Option1)}
                      >
                        <LiForOptions option={x.Option1} />
                      </span>
                    </li>
                    <li>
                      {" "}
                      <span
                        className={LiClass2}
                        onClick={() => setSelectedSocialOptions(x.Option2)}
                      >
                        {" "}
                        <LiForOptions option={x.Option2} />
                      </span>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {x.NOptions === "3" ? (
                  <>
                    <li>
                      {" "}
                      <span
                        className={LiClass1}
                        onClick={() => setSelectedSocialOptions(x.Option1)}
                      >
                        <LiForOptions option={x.Option1} />
                      </span>
                    </li>
                    <li>
                      {" "}
                      <span
                        className={LiClass2}
                        onClick={() => setSelectedSocialOptions(x.Option2)}
                      >
                        {" "}
                        <LiForOptions option={x.Option2} />
                      </span>
                    </li>
                    <li>
                      {" "}
                      <span
                        className={LiClass3}
                        onClick={() => setSelectedSocialOptions(x.Option3)}
                      >
                        {" "}
                        <LiForOptions option={x.Option3} />
                      </span>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {x.NOptions === "4" ? (
                  <>
                    <li>
                      {" "}
                      <span
                        className={LiClass1}
                        onClick={() => setSelectedSocialOptions(x.Option1)}
                      >
                        <LiForOptions option={x.Option1} />
                      </span>
                    </li>
                    <li>
                      {" "}
                      <span
                        className={LiClass2}
                        onClick={() => setSelectedSocialOptions(x.Option2)}
                      >
                        {" "}
                        <LiForOptions option={x.Option2} />
                      </span>
                    </li>
                    <li>
                      {" "}
                      <span
                        className={LiClass3}
                        onClick={() => setSelectedSocialOptions(x.Option3)}
                      >
                        {" "}
                        <LiForOptions option={x.Option3} />
                      </span>
                    </li>
                    <li>
                      {" "}
                      <span
                        className={LiClass4}
                        onClick={() => setSelectedSocialOptions(x.Option4)}
                      >
                        {" "}
                        <LiForOptions option={x.Option4} />
                      </span>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <div style={{ marginTop: "5%" }}>
                  {selectedSocialOption !== "" ? (
                  <>
                  {Button(x.Price, selectedSocialOption)}
                  </>
                  ) : (
                    ""
                  )}
                </div>
              </motion.div>
            );
          } else if (canJoin === false) {
            var redireccion = "/ForPrivatesPassword/" + id;
            return <Redirect to={redireccion}></Redirect>;
          }
        } else if (x.State === "Public") {  
          return (
            <motion.div
              transition={{ type: "spring", duration: 2 }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="selectOptions_card"
            >
              <h3>Select the price for the coin</h3>
              <input
                onChange={(e) => setSelectedCoinSocialBet(e.target.value)}
                className="input"
                type="number"
                placeholder="Price of the coin"
              />
              <div style={{ marginTop: "10%" }}>
                {selectedCoinSocialBet ? (
                 
                  <>{Button(x.Price, selectedCoinSocialBet)}</>
                ) : (
                  <></>
                )}
              </div>
            </motion.div>
          );
        }
      }
    });
    return f;
  };

  return <div className="Total">{Check()}</div>;
}
