import React from "react";

import MenuList from "../../MenuList";
import MenuHeader from "../../MenuHeader";
import Charts from "./Charts";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

function Analisis() {
  const user = useSelector(selectUser);
  //Get the users
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
  //Obtener las apuestas
  const betLotery = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setBets((bets) => [
            ...bets,
            {
              data: data,
              id: id,
            },
          ]);
        });
      });
  };
  //Para el valor
  const [bets, setBets] = useState([]);
  const [Users, setUsers] = useState([]);


  useEffect(() => {
    betLotery();
    FUsers();
  }, []);

  const [age, setAge] = React.useState("");
  const [changed, setChanged] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    setChanged(!changed)
   
  };
  const ChangeToTrue = () => {
    setChanged(true)
  }

  return (
    <div className="menuScreen">
      <MenuHeader />
      <div className="menuScreen__container">
        <div className="menuScreen__left">
          <MenuList />
        </div>
        <div style={{ margin: "5%", marginLeft: "5%", width: "80%" }}>
        
        {Users &&
            Users.map((fUsers) => {
        
              if (fUsers.email === user.email) {
                if (fUsers.bets === 0) {
                  return <div>
                    <h1>You dont have any bet yet, let start!</h1>
                  </div>;
                } else {
                  return (
                    <div>
    <h1 style={{ fontSize: "50px" }}>Analisis of Data</h1>
          <hr />
          <p>First select which of yours bets you wanna analise</p>

          <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleChange}
                autoWidth
                label="Age"
              >
                {bets &&
                  bets.map((bet) => {
                    if (
                      bet.data.userEmail === user.email ||
                      bet.data.payment === true
                    ) {
                      return (
                        <MenuItem key={bet.id} value={bet}>
                          {bet.data.Coin} #{bet.id[0]}
                          {bet.id[1]}
                          {bet.id[2]}
                          {bet.id[3]}
                        </MenuItem>
                      );
                    }
                  })}
                  
              </Select>
            </FormControl>
          
          </div>
          {changed == false && age !== '' ? <Button onClick={ChangeToTrue}>Reload</Button> : null }

          <Charts SelectedBet={age} Changed={changed} AllBets={bets}></Charts>
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

export default Analisis;
