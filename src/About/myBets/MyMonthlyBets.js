import * as React from "react";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import "./Mybets.css";
import "./MyMonthlyBets.css";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("Etherum", 159, 6.0, 24, 4.0)];

export default function MyMonthlyBets({setmonthlyId}) {
  //User
  const user = useSelector(selectUser);

  //Obtener las apuestas
  const betLotery = () => {
    db.collection("monthly_bet")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setMonthly_bets((monthly_bets) => [
            ...monthly_bets,
            { data: data, id: id },
          ]);
        });
      });
  };
  function Users() {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setUsers((users) => [...users, data]);
        });
      });
  }

  const [monthly_bets, setMonthly_bets] = useState([]);
  const [opened, setOpened] = useState(false)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    betLotery();
    Users();
  }, []);

  return (
    <div
      style={{ textAlign: "center" }}
      className="mybets_container StyleCards"
      component={Paper}
    >
      <h1>Your monthly bets</h1>
      {monthly_bets &&
        monthly_bets.map((x) => {
          
          if (x.data.userUid === user.uid && x.data.nBets > 0) {
            return (
              <div className="mymonthly_div">
                <p>You have {x.data.nBets} left</p> 
                <Link to='/ForSetBet' onClick={()=>setmonthlyId(x.id)}>
                <motion.button style={{marginTop:'2%'}} whileHover={{scale:1.2}}>Use one bet</motion.button></Link>
            
              </div>
            );
          }
          else if(x.data.nBets <= 0){
            db.collection('monthly_bet')
            .doc(x.id)
            .delete()
          }
        })}
    </div>
  );
}
