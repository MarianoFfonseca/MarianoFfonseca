import React, { useEffect, useState } from "react";
import "./CreatePersonalBet.css";
import { motion } from "framer-motion";
import "./CreatePersonalBetFinal.css";
import { OpacityOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ButtonCheckOut from "./ButtonCheckOut";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function CreatePersonalBetFinal({
  setSocialBet,
  socialBet,
  socialOptions,
  setUidPersonal,
  setCreatedBet
}) {
  let spanClass = "private" === socialBet.State ? "active" : "";
  let spanClass2 = "public" === socialBet.State ? "active" : "";
  let Price = socialBet.Price;
  const [error, setError] = useState(true);
  const [Dayerror, setDayError] = useState(true);
  const [Dayerror2, setDayError2] = useState(true);
  const [mError, setmError] = useState(
    "The password need to have 7 characters"
  );
  const [mDayError, setmDayError] = useState("The date need to me more");
  const [mDayError2, setmDayError2] = useState(
    "The last day need to me less than the day of the bet"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());

  const changeFinalDay = (date) => {
    var today = new Date();
    var betToday = new Date(date);
    // Pass to numbers
    var numberBetToday = betToday.getTime();
    var numberToday = today.getTime();
    if (numberBetToday < numberToday) {
      setDayError(true);
      setmDayError("The date need to me more");
    } else {
      setDayError(false);
      setmDayError("");
    }

    const FinalDay = date;
    setStartDate(FinalDay);
    setSocialBet({ ...socialBet, FinalDay });
  };
  const changeFinalDay2 = (date) => {
    var today = startDate;
    var betToday = new Date(date);
    // Pass to numbers
    var numberBetToday = betToday.getTime();
    var numberToday = today.getTime();
    if (numberBetToday >= numberToday) {
      setDayError2(true);
      setmDayError2("The date need to me less than the day of the bet");
    } else {
      setDayError2(false);
      setmDayError2("");
    }
    const LastDay = date;
    setStartDate2(LastDay);
    setSocialBet({ ...socialBet, LastDay });
  };

  // Otra cosa
  const changePrice = (e) => {
    const Price = e.target.value;
    setSocialBet({ ...socialBet, Price });
  };
  const changeCoin = (e) => {
    const Coin = e.target.value;
    setSocialBet({ ...socialBet, Coin });
  };
  const changeNOptions = (e) => {
    const NOptions = e.target.value;
    setSocialBet({ ...socialBet, NOptions });
  };
  const changePassword = (e) => {
    const Password = e.target.value;
    if (Password.length < 7) {
      setError(true);
      setmError("The password need to have 7 characters");
    } else {
      setError(false);
      setmError("");
    }
    setSocialBet({ ...socialBet, Password });
  };

  const ComprobarBotton = () => {
    if (socialBet.State === "Private") {
      if (
        error === false &&
        Dayerror === false &&
        Dayerror2 === false &&
        socialBet.NOptions &&
        socialBet.Password
      ) {
        return (
          <Link to="/CreateOptions">
            <motion.button
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="cpersonal_button"
            >
              Next page
            </motion.button>
          </Link>
        );
      } else {
        <></>;
      }
    } else if (socialBet.State === "Public") {
      if (Dayerror === false && Dayerror2 === false) {
        return (
          <ButtonCheckOut
            setUidPersonal={setUidPersonal}
            Price={Price}
            socialBet={socialBet}
            socialOptions={socialOptions}
            setCreatedBet={setCreatedBet}
          />
        );
      } else {
        <></>;
      }
    }
  };
  //Get days

  return (
    <div className="Total">
      <motion.div
        initial={{ x: 1000, scale: 0 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="cpersonal_container"
      >
        <h1>Almost ready!</h1>
        <div className="cpersonal_div">
          <form className="cpersonal_form" action="" method="post">
            {socialBet.State === "Private" ? (
              <div className="cpersonal_depend">
                <span>Select the day of the bet</span>
                <div>
                  <DatePicker
                    className="DatePiker"
                    selected={startDate}
                    onChange={(date: Date) => changeFinalDay(date)}
                  />
                </div>
                <div style={{ marginTop: "4%" }} className="espacio"></div>
                <span>Last day to join</span>
                <div>
                  <DatePicker
                    className="DatePiker"
                    selected={startDate2}
                    onChange={(date: Date) => changeFinalDay2(date)}
                  />
                </div>
                <div style={{ marginTop: "4%" }} className="espacio"></div>




<div className="cpersonal_types">
  <div>
                <span className="uno">Price of the bet</span>
                <select
                  className="uno"
                  onChange={changePrice}
                  name="cars"
                  id="cars"
                >
                  <option value="Free">Free</option>
                  <option value="5">$5</option>
                  <option value="10">$10</option>
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                  <option value="250">$250</option>
                </select>
                </div>
                <div style={{ marginTop: "4%" }} className="espacio"></div>
                <div className="dos">
                <span >Options of the bet</span>
                <select
                  
                  onChange={changeNOptions}
                  style={{ display: "block" }}
                  name="cars"
                  id="cars"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                </div>
                </div>




                <div style={{ marginTop: "4%" }} className="espacio"></div>
<span>Password </span>
                <input
                  type="text"
                  placeholder="Password of the bet"
                  onChange={changePassword}
                />
              </div>
            ) : (
              <div className="cpersonal_depend">
                 <span>Day of the bet</span>
                <div>
                  <DatePicker
                    className="DatePiker"
                    selected={startDate}
                    onChange={(date: Date) => changeFinalDay(date)}
                  />
                </div>
                <div style={{ marginTop: "4%" }} className="espacio"></div>
                <span>Last day to join</span>
                <div>
                  <DatePicker
                    className="DatePiker"
                    selected={startDate2}
                    onChange={(date: Date) => changeFinalDay2(date)}
                  />
                </div>
                <div style={{ marginTop: "4%" }} className="espacio"></div>
                <span>Price of the bet</span>
                <select
                  style={{ display: "block" }}
                  onChange={changePrice}
                  name="cars"
                  id="cars"
                >
                  <option value="Free">Free</option>
                  <option value="5">$5</option>
                  <option value="10">$10</option>
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                  <option value="250">$250</option>
                </select>
                <div style={{ marginTop: "4%" }} className="espacio"></div>
                <span>Coin of the bet</span>
                <select onChange={changeCoin} name="cars" id="cars">
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Etherum">Etherum</option>
                  <option value="Dogecoin">Dogecoin</option>
                  <option value="BNB">BNB</option>
                </select>
              </div>
            )}
          </form>
          <div className="cpersonal_next">
            {socialBet.State === "Private" && error === true ? (
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                style={{ color: "orange", marginTop: "2%" }}
              >
                {mError}
              </motion.p>
            ) : (
              <></>
            )}
            {socialBet.Price !== "Free" ? (
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                style={{ color: "orange", marginTop: "2%" }}
              >
                You need to pay the price of your bet
              </motion.p>
            ) : (
              <></>
            )}
            {Dayerror === true ? (
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                style={{ color: "orange", marginTop: "2%" }}
              >
                {mDayError}
              </motion.p>
            ) : (
              <></>
            )}
            {Dayerror2 === true ? (
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                style={{ color: "orange", marginTop: "2%" }}
              >
                {mDayError2}
              </motion.p>
            ) : (
              <></>
            )}

            {ComprobarBotton()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CreatePersonalBetFinal;
