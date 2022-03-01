import React from "react";
import MyBetsMain from "./MyBetsMain";
import MyLastsBets from "./MyLastsBets";
import MenuList from "../../MenuList";
import MenuHeader from "../../MenuHeader";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import db from "../../firebase";
import { useState, useEffect } from "react";
function MyBets() {
  //for the user
  const user = useSelector(selectUser);
  const [Users, setUsers] = useState([]);
  console.log(Users);

  const FUsers = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setUsers((Users) => [...Users, data]);
        });
      });
  };

  useEffect(() => {
    FUsers();
  }, []);

  return (
    <div className="menuScreen">
      <MenuHeader />
      <div className="menuScreen__container">
        <div className="menuScreen__left">
          <MenuList />
        </div>
        <div style={{ margin: "5%", marginLeft: "15%" }}>
          {Users &&
            Users.map((fUsers) => {
              console.log(fUsers)
              console.log(user)
              console.log('here')
              if (fUsers.email === user.email) {
                if (fUsers.bets === 0) {
                  return <div>
                    <h1>You dont have any bet yet, let start!</h1>
                  </div>;
                } else {
                  return (
                    <div>
                      <Alert severity="info">
                        Now you can analize your bets{" "}
                        <strong>
                          {" "}
                          <Link to="/about/Analisis">check it out !</Link>
                        </strong>
                      </Alert>
                      <h1 style={{ fontSize: "50px", marginTop: "5%" }}>
                        Your Bets
                      </h1>
                      <MyBetsMain></MyBetsMain>

                      <hr style={{ fontSize: "50px", marginTop: "5%" }} />
                      <h1 style={{ fontSize: "50px", marginTop: "5%" }}>
                        Your Lasts Bets
                      </h1>
                      <MyLastsBets></MyLastsBets>
                    </div>
                  );
                }
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default MyBets;
