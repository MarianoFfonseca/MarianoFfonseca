import React, { useEffect, useState } from "react";
import "./GlobalSerch.css";
import Result from "./Result";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import db from "../../firebase";
import { motion } from "framer-motion";
import Filter from "./Filter";
function GlobalSerch() {
  //Obtener todas las apuestas sociales
  const optionsLotery = () => {
    db.collection("socialBets")
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
  const [coin, setCoin] = useState("");

  useEffect(() => {
    optionsLotery();
  }, []);
  //Tener lo que escribe el cliente LISTO
  const [text, setText] = useState("");
  const [first, setFirst] = useState(false);
  const [open, setOpen] = useState(false);

  const [filter, setFilter] = useState({
    minPeapol: "",
    maxPeapol: "",
    minDay: "",
    maxDay: "",
    Status: "",
  });

  const [submitFilter, setSubmitFilter] = useState(false);

  const ForResults = () => {
    if (submitFilter === false) {
      if (text !== "") {
        if (coin === "") {
          return (
            <>
              {options &&
                options.map((element) => {
                  if (
                    element.Title.toLowerCase().includes(text.toLowerCase())
                  ) {
                    return (
                      <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 200, opacity: 0 }}
                      >
                        <Result setFirst={setFirst} element={element}></Result>
                      </motion.div>
                    );
                  }
                })}
            </>
          );
        } else if (coin !== "") {
          return (
            <>
              {" "}
              {options &&
                options.map((element) => {
                  console.log(element.Coin, "este");
                  if (
                    element.Title.toLowerCase().includes(text.toLowerCase()) &&
                    element.Coin === coin
                  ) {
                    return (
                      <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 200, opacity: 0 }}
                      >
                        <Result setFirst={setFirst} element={element}></Result>
                      </motion.div>
                    );
                  }
                })}
            </>
          );
        }
      } else if (text === "") {
        return (
          <motion.h1
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "50px", marginTop: "2%", color: "white" }}
          >
            Type something...
          </motion.h1>
        );
      }
    }
    if(submitFilter === true) {
        console.log('submited')
    }
  };

  const handleChange = (e) => {
    setFirst(false);
    setText(e.target.value);
  };

  //Si cliquea el tipo de crypto
  var SpanClassName2 = coin === "Etherum" ? "active" : "";
  var SpanClassName1 = coin === "Bitcoin" ? "active" : "";
  var SpanClassName3 = coin === "Bnb" ? "active" : "";
  return (
    <div className="bgg">
      <div className="global_global">
        <div className="global_filter">
          <motion.div
            whileHover={{ cursor: "pointer" }}
            onClick={() => setOpen(!open)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {open === false ? (
              <BsFillArrowUpCircleFill size={40} />
            ) : (
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <BsFillArrowUpCircleFill size={40} />
              </motion.div>
            )}
            <span style={{ fontSize: "30px", marginLeft: "5px" }}> Filter</span>
          </motion.div>
          {open === true ? (
            <motion.div
              transition={{ duration: 0.5 }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: "block" }}
            >
              <Filter
                setFilter={setFilter}
                filter={filter}
                setSubmitFilter={setSubmitFilter}
                submitFilter={submitFilter}
              ></Filter>
            </motion.div>
          ) : (
            <></>
          )}
        </div>
        <h1>Serch for bets!</h1>
        <input onChange={handleChange} type="text" placeholder="Serch..." />
        <div className="global_type">
          <motion.li id={SpanClassName1} onClick={() => setCoin("Bitcoin")}>
            bitcoin
          </motion.li>
          <motion.li id={SpanClassName2} onClick={() => setCoin("Etherum")}>
            etherum
          </motion.li>
          <motion.li id={SpanClassName3} onClick={() => setCoin("Bnb")}>
            bnb
          </motion.li>
          {coin !== "" ? (
            <li style={{ color: "red" }} onClick={() => setCoin("")}>
              <GiCancel />
            </li>
          ) : (
            <></>
          )}
        </div>
        <div className="global_continer">
          {ForResults()}
          {text !== "" && first === false ? (
            <motion.h1
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: "50px", marginTop: "2%", color: "white" }}
            >
              No concidence =(
            </motion.h1>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalSerch;
