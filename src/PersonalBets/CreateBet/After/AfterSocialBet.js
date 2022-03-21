import React from "react";
import MenuList from "../../../MenuList";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import db from "../../../firebase";
import Individual from "./Individual";
function AfterSocialBet() {
  const user = useSelector(selectUser);
  const [socialBets, setSocialBets] = useState([]);
  const [socialOptions, setSocialOptions] = useState([]);
  const [usersBet, setUsersBet] = useState([]);
  const betLotery = () => {
    db.collection("socialBets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setSocialBets((socialBets) => [
            ...socialBets,
            { data: data, id: id },
          ]);
        });
      });
    db.collection("socialOptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setSocialOptions((socialOptions) => [
            ...socialOptions,
            { data: data, id: id },
          ]);
        });
      });
  };

  const ForIndividual2 = (socialBet) => {
    const final = socialBet.data.usersInBet.map((x) => {
      if (x === user.email) {
        return <Individual socialBet={socialBet} />;
      }
    });
    return final;
  };
  useEffect(() => {
    betLotery();
  }, []);

  return (
    <div>
      <div className="menuScreen less">
        <div className="menuScreen__container less2">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1 style={{ color: "#fff" }}>🔖 My Social Bets</h1>
            <div className="menuScreen__category">
                  {socialBets &&
                    socialBets.map((socialBet) => ForIndividual2(socialBet))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterSocialBet;
