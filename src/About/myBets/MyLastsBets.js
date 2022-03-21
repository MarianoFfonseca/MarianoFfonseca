import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { useState, useEffect } from "react";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Etherum', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function MyLastsBets() {

  //User
  const user = useSelector(selectUser);
    //Obtener las apuestas
    const betLotery = () => {
      db.collection("bets")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            var data = element.data();
            setBets((bets) => [...bets, data]);
          
          });
        });
    };
  
    const [bets, setBets] = useState([]);

    useEffect(() => {
      betLotery();
    }, []);

  return (
    <div className='mybets_container StyleCards' component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{color:"#FFC0E1"}}>Coin</TableCell>
          
            <TableCell style={{color:"#FFC0E1"}} align="right">Bet of</TableCell>
            <TableCell style={{color:"#FFC0E1"}} align="right">Day of the bet</TableCell>
            <TableCell style={{color:"#FFC0E1"}} align="right">Price of Coin (bet)</TableCell>
            <TableCell style={{color:"#FFC0E1"}} align="right">Final price of the coin</TableCell>
            <TableCell style={{color:"#FFC0E1"}} align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bets && bets.map((bet) => {
            var betDay = new Date(bet.Day)
            var today = new Date()
            var sss = betDay.getTime()
            var yyy = today.getTime()
            if(sss < yyy){
              if(bet.userEmail === user.email || bet.payment === true){
                if(bet.status === 'Lose') {
                  return (
                    <TableRow
                    style={{background:'#FE9090', border:'solid', borderRadius:'30px', borderWidth:'1px'}}
                    key={bet.userEmail}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                           
                     
                    <TableCell component="th" scope="row">
                      {bet.Coin}
                    </TableCell>
                    <TableCell style={{color:"#FFC0E1"}} align="right">${bet.Money}</TableCell>
                    <TableCell style={{color:"#FFC0E1"}} align="right">{bet.Day}</TableCell>
                    <TableCell style={{color:"#FFC0E1"}} align="right">{bet.CoinBet}</TableCell>
                    <TableCell style={{color:"#FFC0E1"}} align="right">Final Price</TableCell>
                    <TableCell style={{color:"#FFC0E1"}} align="right">
                                  {bet.status}
                                  </TableCell>
                                    </TableRow>
                  )
                }else if (bet.status === 'First'){
                  return (
                    <TableRow
                    style={{borderColor:'#90FEAD', border:'solid', borderRadius:'30px', borderWidth:'3px'}}
                    key={bet.userEmail}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                           
                     
                    <TableCell component="th" scope="row">
                      {bet.Coin}
                    </TableCell>
                    <TableCell align="right">${bet.Money}</TableCell>
                    <TableCell align="right">{bet.Day}</TableCell>
                    <TableCell align="right">{bet.CoinBet}</TableCell>
                    <TableCell align="right">Final Price</TableCell>
                    <TableCell align="right">
                                  {bet.status}
                                  </TableCell>
                                    </TableRow>
                  )
                }
            
              }
            }
           
           
            })}
        </TableBody>
      </Table>
    </div>
  );
}
