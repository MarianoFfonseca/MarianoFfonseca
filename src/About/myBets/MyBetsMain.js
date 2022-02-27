import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Etherum", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function MyBetsMain() {
  //User
  const user = useSelector(selectUser);

  //Obtener las apuestas
  const betLotery = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setBets((bets) => [...bets, { data: data, id: id }]);
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



  const [bets, setBets] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    betLotery();
    Users();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        style={{ width: "100%" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>

            <TableCell align="right">Bet of</TableCell>
            <TableCell align="right">Day of the bet</TableCell>
            <TableCell align="right">Day submitted</TableCell>
            <TableCell align="right">Price of Coin (bet)</TableCell>
            <TableCell align="right">id#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
                    {bets &&
                      bets.map((bet) => {
                        if (
                          bet.data.userEmail === user.email ||
                          bet.payment === true
                        ) {
                          return (
                            <TableRow
                              key={bet.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {bet.data.Coin}
                              </TableCell>
                              <TableCell align="right">
                                ${bet.data.Money}
                              </TableCell>
                              <TableCell align="right">
                                {bet.data.Day}
                              </TableCell>
                              <TableCell align="right">No yet</TableCell>
                              <TableCell align="right">
                                {bet.data.CoinBet}
                              </TableCell>
                              <TableCell align="right">
                                {bet.id[0]}
                                {bet.id[1]}
                                {bet.id[2]}
                                {bet.id[3]}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
