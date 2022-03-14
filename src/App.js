import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import db from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { Footer } from "./Footer";
import { Fade } from "react-awesome-reveal";
import FeaturedScreen from "./screens/FeaturedScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/MenuScreen";
import SignupScreen from "./screens/SignupScreen";
import FormInvestingCoin from "./FormInvesting/FormInvestingCoin";
import FormInvestingDay from "./FormInvesting/FormInvestingDay";
import MyBets from "./About/myBets/MyBets";
import Succes from "./FormInvesting/AfterCheckOut/Succes";
import Cancel from "./FormInvesting/AfterCheckOut/Cancel";
import Analisis from "./About/myBets/Analisis";
import MyAccount from "./About/myAcount/MyAccount";
import VerifyEmail from "./VerifyEmail";
import Train from "./InfoInvesting/Train";
import { getAuth } from "firebase/auth";
import FormInvestingMoney from "./FormInvesting/FormInvestingMoney";
import FormInvestingBet from "./FormInvesting/FormInvestingBet";
import ReviewBet from "./FormInvesting/ReviewBet";
import HowInvest from "./InfoInvesting/HowInvest/HowInvest";
import MonthlyBet from "./MonthlyBet/MonthlyBet";
import MonthlyBetCheckOut from "./MonthlyBet/MonthlyBetCheckOut";
import SuccesMonthly from "./MonthlyBet/SuccesMonthly";
import CancelMonthly from "./MonthlyBet/CancelMonthly";
import PremadeBet from "./PremadeBet/PremadeBet";
import ForSetBet from "./About/myBets/MyMonthlyBet/ForSetBet";
import PersonalBets from "./PersonalBets/PersonalBets";
import CreatePersonalBet from "./PersonalBets/CreateBet/CreatePersonalBet";
import CreatePersonalBetFinal from "./PersonalBets/CreateBet/CreatePersonalBetFinal";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //A normal bet
  const [bet, setBet] = useState({ Coin: "", Money: "", CoinBet: "", Day: "" });
  //A social bet
  const [socialBet, setSocialBet] = useState({
    Title: "",
    Description: "",
    ImgUrl: "",
    MaxPeapol: "",
    Topic: "",
    State: "",
  });

  //more
  const [monthlyB, setmonthlyB] = useState("fullYear");
  const [monthlyId, setmonthlyId] = useState(null);
  const setmonthlyBB = (x) => {
    setmonthlyB(x);
  };
  console.log(monthlyB);
  console.log(bet);
  const setCoin = (Coin) => {
    setBet({ ...bet, Coin });
  };
  const setDay = (Day) => {
    setBet({ ...bet, Day });
  };
  const setMoney = (Money) => {
    setBet({ ...bet, Money });
  };
  const setCoinBet = (CoinBet) => {
    setBet({ ...bet, CoinBet });
  };
  const getPremadeBet = () => {
    db.collection("premadeBet")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setfPremadeBet((fPremadeBet) => [...fPremadeBet, data]);
        });
      });
  };
  const [fPremadeBet, setfPremadeBet] = useState([]);

  useEffect(() => {
    getPremadeBet();
  }, []);

  const [profile, setProfile] = useState([]);

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    setProfile(getAuth());
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
  }, [dispatch]);
  console.log(profile.currentUser);
  return (
    <div className="app">
      {load === true ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <HomeScreen />
              <Fade>
                <Footer />
              </Fade>
            </Route>
            <Route exact path="/account/signin">
              {user ? <Redirect to="/menu" /> : <LoginScreen />}
            </Route>
            <Route exact path="/account/create">
              {user ? <Redirect to="/menu" /> : <SignupScreen />}
            </Route>
            {/* For the menu */}
            <Route exact path="/menu">
              {!user ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MenuScreen />
                </>
              )}
            </Route>
            <Route exact path="/personalBets">
              {!user ? (
                <Redirect to="/personalBets" />
              ) : (
                <>
                  <Header />
                  <PersonalBets
                    load={load}
                    profile={profile}
                    setCoin={setCoin}
                    bet={bet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/CreatePersonalBet">
              {!user ? (
                <Redirect to="/CreatePersonalBet" />
              ) : (
                <>
                  <Header />
                  <CreatePersonalBet
                    socialBet={socialBet}
                    setSocialBet={setSocialBet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/CreatePersonalBetFinal">
              {!user ? (
                <Redirect to="/CreatePersonalBetFinal" />
              ) : (
                <>
                  <Header />
                  <CreatePersonalBetFinal
                    socialBet={socialBet}
                    setSocialBet={setSocialBet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/formCoin">
              {!user ? (
                <Redirect to="/formCoin" />
              ) : (
                <>
                  <Header />
                  <FormInvestingCoin
                    load={load}
                    profile={profile}
                    setCoin={setCoin}
                    bet={bet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/formDay">
              {!user ? (
                <Redirect to="/formDay" />
              ) : (
                <>
                  <Header />
                  <FormInvestingDay setDay={setDay} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/formMoney">
              {!user ? (
                <Redirect to="/formMoney" />
              ) : (
                <>
                  <Header />
                  <FormInvestingMoney setMoney={setMoney} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/formCoinBet">
              {!user ? (
                <Redirect to="/formCoinBet" />
              ) : (
                <>
                  <Header />
                  <FormInvestingBet setCoinBet={setCoinBet} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/ReviewBet">
              {!user ? (
                <Redirect to="/ReviewBet" />
              ) : (
                <>
                  <Header />
                  <ReviewBet setCoinBet={setCoinBet} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/ForSetBet">
              {!user ? (
                <Redirect to="/ForSetBet" />
              ) : (
                <>
                  <Header />
                  <ForSetBet
                    monthlyId={monthlyId}
                    setBet={setBet}
                    setCoinBet={setCoinBet}
                    setDay={setDay}
                    bet={bet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/cancel">
              <Header />
              <Cancel />
            </Route>
            <Route exact path="/succes">
              <Header />
              <Succes />
            </Route>
            <Route exact path="/about/Mybets">
              {profile.currentUser === null ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MyBets setmonthlyId={setmonthlyId} />
                </>
              )}
            </Route>
            <Route exact path="/about/Analisis">
              {!user ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <Analisis />
                </>
              )}
            </Route>
            <Route exact path="/about/MyAccount">
              {!user ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MyAccount />
                </>
              )}
            </Route>
            <Route exact path="/VerifyEmail">
              {!user ? (
                <Redirect to="/VerifyEmail" />
              ) : (
                <>
                  <VerifyEmail />
                </>
              )}
            </Route>
            <Route exact path="/Train">
              {!user ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <Train />
                </>
              )}
            </Route>
            <Route exact path="/HowInvest">
              {!user ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <HowInvest />
                </>
              )}
            </Route>
            <Route exact path="/MonthlyBet">
              {!user ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MonthlyBet setmonthlyBB={setmonthlyBB} />
                </>
              )}
            </Route>
            <Route exact path="/PremadeBet">
              {!user ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <PremadeBet
                    setBet={setBet}
                    bet={bet}
                    fPremadeBet={fPremadeBet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/MonthlyBetCheckOut">
              {!user ? (
                <Redirect to="/MonthlyBetCheckOut" />
              ) : (
                <>
                  <Header menuPage />
                  <MonthlyBetCheckOut monthlyB={monthlyB} />
                </>
              )}
            </Route>
            <Route exact path="/SuccesMonthly">
              {!user ? (
                <Redirect to="/SuccesMonthly" />
              ) : (
                <>
                  <Header />
                  <SuccesMonthly monthlyB={monthlyB} />
                </>
              )}
            </Route>
            <Route exact path="/CancelMonthly">
              {!user ? (
                <Redirect to="/CancelMonthly" />
              ) : (
                <>
                  <Header />
                  <CancelMonthly monthlyB={monthlyB} />
                </>
              )}
            </Route>

            <Route exact path="/menu/featured">
              <Header />
              <FeaturedScreen />
              <Fade>
                <Footer />
              </Fade>
            </Route>
          </Switch>
        </Router>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default App;
