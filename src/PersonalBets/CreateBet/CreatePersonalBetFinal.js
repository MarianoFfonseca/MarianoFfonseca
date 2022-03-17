import React, { useEffect, useState } from "react";
import "./CreatePersonalBet.css";
import { motion } from "framer-motion";
import "./CreatePersonalBetFinal.css";
import { OpacityOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ButtonCheckOut from "./ButtonCheckOut";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function CreatePersonalBetFinal({ setSocialBet, socialBet, socialOptions }) {
  let spanClass = "private" === socialBet.State ? "active" : "";
  let spanClass2 = "public" === socialBet.State ? "active" : "";
  let Price = socialBet.Price;
  const [error, setError] = useState(false);
  const [mError, setmError] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const changeFinalDay = (date) => {
    const FinalDay = date;
    setStartDate(FinalDay);
    setSocialBet({ ...socialBet, FinalDay });
  };

  const changeLDay = (e) => {
    const LDay = e.target.value;
    setSocialBet({ ...socialBet, LDay });
  };
  const changeLMonth = (e) => {
    const LMonth = e.target.value;
    setSocialBet({ ...socialBet, LMonth });
  };
  const changeLYear = (e) => {
    const LYear = e.target.value;
    setSocialBet({ ...socialBet, LYear });
  };
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
    } else {
      if (
        error === false
      ) {
        return <ButtonCheckOut Price={Price} socialBet={socialBet} socialOptions={socialOptions}  />;
      } else {
        <></>;
      }
    }
  };

  return (
    <div className="Total">
      <motion.div 
       initial={{x:1000, scale:0}}
       animate={{x:0, scale:1}}
       transition={{duration:1, type:'spring', stiffness:100}}
      className="cpersonal_container">
        <h1>Almost ready!</h1>
        <div className="cpersonal_div">
          <form className="cpersonal_form" action="" method="post">

            {socialBet.State === "Private" ? (
              <div className="cpersonal_depend">
                <div>
                  <DatePicker
                  className="DatePiker"
                    selected={startDate}
                    onChange={(date: Date) => changeFinalDay(date)}
                  />
                </div>

                <select onChange={changePrice} name="cars" id="cars">
                  <option value="Free">Free</option>
                  <option value="5">$5</option>
                  <option value="10">$10</option>
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                  <option value="250">$250</option>
                </select>
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
                <input
                  type="text"
                  placeholder="Password of the bet"
                  onChange={changePassword}
                />
              </div>
            ) : (
              <div className="cpersonal_depend">
                <div>
                  <DatePicker
                  className="DatePiker"
                    selected={startDate}
                    onChange={(date: Date) => changeFinalDay(date)}
                  />
                </div>

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
            {error === true ? (
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                style={{ color: "red" }}
              >
                {mError}
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
