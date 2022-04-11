import React, { useState, useEffect } from "react";
import db from "../firebase";
const DetectWinner = () => {
  const [bets, setBets] = useState([]);
  const [length, setLength] = useState(0)



  const [betsFinished, setBetsFinished] = useState([]);
  const [counter, setCounter] = useState(0)
  
  const [allbetsFinished, setAllBetsFinished] = useState([]);
  const [InfoAllBets, setInfoAllBets] = useState([]);
  const [group, setGroup] = useState(0);
  const [finish, setFinish] = useState(false);

  const [winner, setWinner] = useState();
  const [infoWinner, setInfoWinner] = useState({});
  //Use effect
  
  //Price bitcoin, price etherum
  const [priceB, setPriceB] = useState(null);
  const [priceE, setPriceE] = useState(null);

  useEffect(() => {
    GetBets();
    fetch("https://api.coinpaprika.com/v1/tickers/btc-bitcoin")
      .then((res) => res.json())
      .then((data) => {
        setPriceB(data.quotes.USD.price)
      })
      .catch((error) => {
        console.log(error);
      });
      fetch("https://api.coinpaprika.com/v1/tickers/eth-ethereum")
      .then((res) => res.json())
      .then((data) => {
        setPriceE(data.quotes.USD.price)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Tengo que obtener todas las apuestas

  //APUESTAS
  const GetBets = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        var length = querySnapshot.size
        setLength(length)
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setBets((bets) => [...bets, { data: data, id: id }]);
        });
      });
  };

  //Una ves con las apuestas las tengo que mapear y obtener cuales ya pasaron y no estan checheadas

  useEffect(() => {
    Check();
  }, [bets]);
  //APUESTAS PASADASSS
  const Check = () => {
    
    if(length !== 0 && bets.length === length)
    {
    
      bets &&
      bets.map((element) => {

        let bet = element.data;
        //Days
        var betDay = new Date(bet.Day);
        var today = new Date();
        var fbetDay = betDay.getTime();
        var fToday = today.getTime();
        if (fToday > fbetDay && bet.status === "none") {
          
          setBetsFinished(bet)


        
        }
      });
    }
 
  };

  //Una ves esto tengo que ovtener todas las apuestas de este tipo por Ejemplo:
  //Si es del dia 3/3/2022, tengo que obtener todas las apuestas de ese dia
  //Las tengo que juntar en un array, al precio y a el id
  // ARRAY ES EL DE ALLBETFINALL


  // PARTISIPANTESS
  
  const GetOthers = () => {

    bets.map((element) => {
      let bet = element.data;
      if (betsFinished.Day === bet.Day && bet.status === "none" && bet.Coin === betsFinished.Coin) {
        let int = parseInt(element.data.CoinBet, 10);
        setAllBetsFinished((allbetsFinished) => [...allbetsFinished, int]);
        setInfoAllBets((InfoAllBets) => [
          ...InfoAllBets,
          {
            id: element.id,
            CoinBet: element.data.CoinBet,
            Day: element.data.Day,
            Coin: element.data.Coin
          },
        ]);
      }
    });
    setGroup(group + 1);
  };

  useEffect(() => {
    GetOthers();
    setFinish(!finish);
  }, [betsFinished]);

  //Se ressete las apuestas en un grupo

  //Una ves obtenido el precio de todas las apuestas tengo que encontrar cual es la mas cercana
  // Cual es el premio final

  const Compare = () => {
    const Test = () => {
      if (allbetsFinished.length !== 0) {
        const Coin = InfoAllBets[0].Coin === 'Bitcoin' ? priceB : priceE
        
        const first2Str = String(Coin).slice(0, 8); // 👉️ '1'
const coinValue = Number(first2Str);
   
       
        var winner = allbetsFinished.reduce(function (prev, curr) {
          return Math.abs(curr - coinValue) < Math.abs(prev - coinValue)
            ? curr
            : prev;
        });
        setWinner(winner);
        setAllBetsFinished([]);
      }
    };
    Test();
  };

  useEffect(() => {
    Compare();
  }, [finish]);

  //Obtener el id de la apuesta del ganador
  const GetWinnerId = () => {
    InfoAllBets &&
      InfoAllBets.map((element) => {
        const CoinBet = parseInt(element.CoinBet, 10);

        if (CoinBet === winner) {
          setInfoWinner(element);
          SetLosersAndWinners(element.id, 'winner')
        }
        else if(CoinBet !== winner){
          SetLosersAndWinners(element.id, 'loser')
        }
      });
  };

  useEffect(() => {
    if (winner !== undefined) {
      GetWinnerId();
    }
  }, [winner]);

  //Tengo que a esta ponerle Ganador en el status y a las otras les pongo perdedores
  const SetLosersAndWinners = (id, status) => {
    db.collection('bets')
    .doc(id)
    .update({
      status: status
    })
  };

  //Luego el sistema para que esto aparesca

  //   var winner = bets.reduce(function (prev, curr) {
  //     return Math.abs(curr - coinValue) < Math.abs(prev - coinValue)
  //       ? curr
  //       : prev;
  //   });
  //   console.log(winner);
};

export default DetectWinner;
