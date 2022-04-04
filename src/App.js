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
import GetCryptoValues from "./GetCryptoValues";
import CreateOptions from "./PersonalBets/CreateBet/CreateOptions";
import AfterSocialBet from "./PersonalBets/CreateBet/After/AfterSocialBet";
import DetailsSocial from "./PersonalBets/CreateBet/After/DetailsSocial";
import firebase from "firebase/compat/app";
import { motion } from "framer-motion";
import SelectType from "./PersonalBets/CreateBet/SelectType";
import SuccesOver from "./PersonalBets/CreateBet/After/SuccesOver";
import FindBetPage from "./PersonalBets/FindBet/FindBetPage";
import GlobalSerch from "./PersonalBets/FindBet/GlobalSerch";
import FindPrivateBet from "./PersonalBets/FindBet/FindPrivateBet";
import DescriptionBet from "./PersonalBets/FindBet/DescriptionBet.js";
import ForPrivatesPassword from "./PersonalBets/FindBet/ForPrivatesPassword/ForPrivatesPassword";
import SelectOptionsBet from "./PersonalBets/JoinABet/SelectOptionsBet";
import SuccesIndividual from "./PersonalBets/JoinABet/SuccesIndividual";
import SuccesIndivudualPayment from "./PersonalBets/JoinABet/SuccesIndividualPayment";
import DetectWinner from './Sistems/DetectWinner'
import GetMoneyBet from './ForGetMoney/GetMoneyBet'

function App() {
  // Detect Winner
  DetectWinner()


  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //A normal bet
  const [bet, setBet] = useState({ Coin: "", Money: "", CoinBet: "", Day: "" });
  const d = new Date();
  const f = d.toDateString();
  //A social bet
  const [uidPersonal, setUidPersonal] = useState();
  const [socialBet, setSocialBet] = useState({
    Title: "",
    Description: "",
    ImgUrl: "",
    MaxPeapol: "",
    Topic: "",
    Coin: "Bitcoin",
    State: "Private",
    Price: "Free",
    NOptions: "2",
    Password: "",
    FinalDay: f,
    LastDay: f,
  });

  const [socialOptions, setSocialOptions] = useState({
    NOptions: socialBet.NOptions,
    Option1: "",
    Option2: "",
    Option3: "",
    Option4: "",
  });
  //For all socialBets
  const ForAllSocialBets = () => {
    db.collection("socialBets")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setAllSocialBets((allSocialBets) => [...allSocialBets, data]);
        });
      });
  };
  const [allSocialBets, setAllSocialBets] = useState([]);
  const [canJoin, setCanJoin] = useState(false);
  const [canJoinBet, setCanJoinBet] = useState("");
  const [selectedSocialOption, setSelectedSocialOptions] = useState("");
  const [selectedCoinSocialBet, setSelectedCoinSocialBet] = useState();
  const [individualBetPrice, setIndividualBetPrice] = useState("");
  const [createdBet, setCreatedBet] = useState(false);

  //more
  const [monthlyB, setmonthlyB] = useState("fullYear");
  const [monthlyId, setmonthlyId] = useState(null);
  const setmonthlyBB = (x) => {
    setmonthlyB(x);
  };

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
    ForAllSocialBets();
  }, []);

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
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
  const profile = getAuth();
  //For comprube
  const [is, setIs] = useState("Nothing");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setIs("Si");
    } else {
      setIs("No");
    }
  });

  return (
    <div className="app">
      <GetCryptoValues />
      {is !== "Nothing" ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <HomeScreen />
            </Route>
            <Route exact path="/account/signin">
              {is === "Si" ? <Redirect to="/menu" /> : <LoginScreen />}
            </Route>
            <Route exact path="/account/create">
              {is === "Si" ? <Redirect to="/menu" /> : <SignupScreen />}
            </Route>
            {/* For the menu */}
            <Route exact path="/menu">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MenuScreen load={load} />
                </>
              )}
            </Route>
            <Route exact path="/GetMoneyBet/:id">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <GetMoneyBet/>
                </>
              )}
            </Route>
            <Route exact path="/SuccesIndivudualPayment/:id">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <SuccesIndivudualPayment
                    selectedSocialOption={selectedSocialOption}
                    selectedCoinSocialBet={selectedCoinSocialBet}
                    user={user}
                  />
                </>
              )}
            </Route>
            <Route exact path="/SuccesIndividual">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <SuccesIndividual />
                </>
              )}
            </Route>
            <Route exact path="/SelectOptionsBet/:id">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <SelectOptionsBet
                    setIndividualBetPrice={setIndividualBetPrice}
                    setSelectedCoinSocialBet={setSelectedCoinSocialBet}
                    selectedCoinSocialBet={selectedCoinSocialBet}
                    canJoin={canJoin}
                    canJoinBet={canJoinBet}
                    setSelectedSocialOptions={setSelectedSocialOptions}
                    selectedSocialOption={selectedSocialOption}
                  />
                </>
              )}
            </Route>
            <Route exact path="/personalBets">
              {is === "No" ? (
                <Redirect to="/account/signin" />
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
            <Route exact path="/ForPrivatesPassword/:id">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <ForPrivatesPassword
                    setCanJoin={setCanJoin}
                    canJoin={canJoin}
                    allSocialBets={allSocialBets}
                    setCanJoinBet={setCanJoinBet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/DescriptionBet/:id">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <DescriptionBet
                    user={user}
                    allSocialBets={allSocialBets}
                    canJoin={canJoin}
                    canJoinBet={canJoinBet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/FindPrivateBet">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <FindPrivateBet
                    setCanJoin={setCanJoin}
                    setCanJoinBet={setCanJoinBet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/SuccesOver/:id">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <SuccesOver uidPersonal={uidPersonal} />
                </>
              )}
            </Route>
            <Route exact path="/GlobalSerch">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <GlobalSerch />
                </>
              )}
            </Route>
            <Route exact path="/FindBetPage">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <FindBetPage />
                </>
              )}
            </Route>
            <Route exact path="/SelectType">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <SelectType
                    socialBet={socialBet}
                    setSocialBet={setSocialBet}
                  />
                </>
              )}
            </Route>
            <Route exact path="/CreatePersonalBet">
              {is === "No" ? (
                <Redirect to="/account/signin" />
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
            <Route exact path="/CreateOptions">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <CreateOptions
                    setCreatedBet={setCreatedBet}
                    socialBet={socialBet}
                    socialOptions={socialOptions}
                    setSocialOptions={setSocialOptions}
                    setUidPersonal={setUidPersonal}
                  />
                </>
              )}
            </Route>
            <Route exact path="/MySocialBets">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <AfterSocialBet
                    createdBet={createdBet}
                    setCreatedBet={setCreatedBet}
                  />
                </>
              )}
            </Route>
            <Route path="/MySocialBets/details/:id">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <DetailsSocial user={user} />
                </>
              )}
            </Route>
            <Route exact path="/CreatePersonalBetFinal">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <CreatePersonalBetFinal
                    setCreatedBet={setCreatedBet}
                    socialBet={socialBet}
                    setSocialBet={setSocialBet}
                    socialOptions={socialOptions}
                    setUidPersonal={setUidPersonal}
                  />
                </>
              )}
            </Route>
            <Route exact path="/formCoin">
              {is === "No" ? (
                <Redirect to="/account/signin" />
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
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <FormInvestingDay setDay={setDay} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/formMoney">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <FormInvestingMoney setMoney={setMoney} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/formCoinBet">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <FormInvestingBet setCoinBet={setCoinBet} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/ReviewBet">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <ReviewBet setCoinBet={setCoinBet} bet={bet} />
                </>
              )}
            </Route>
            <Route exact path="/ForSetBet">
              {is === "No" ? (
                <Redirect to="/account/signin" />
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
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <Cancel />
                </>
              )}
            </Route>
            <Route exact path="/succes">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <Succes />
                </>
              )}
            </Route>
            <Route exact path="/about/Mybets">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MyBets setmonthlyId={setmonthlyId} />
                </>
              )}
            </Route>
            <Route exact path="/about/Analisis">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <Analisis />
                </>
              )}
            </Route>
            <Route exact path="/about/MyAccount">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MyAccount />
                </>
              )}
            </Route>
            <Route exact path="/VerifyEmail">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <VerifyEmail />
                </>
              )}
            </Route>
            <Route exact path="/Train">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <Train />
                </>
              )}
            </Route>
            <Route exact path="/HowInvest">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <HowInvest />
                </>
              )}
            </Route>
            <Route exact path="/MonthlyBet">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MonthlyBet setmonthlyBB={setmonthlyBB} />
                </>
              )}
            </Route>
            <Route exact path="/PremadeBet">
              {is === "No" ? (
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
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header menuPage />
                  <MonthlyBetCheckOut monthlyB={monthlyB} />
                </>
              )}
            </Route>
            <Route exact path="/SuccesMonthly">
              {is === "No" ? (
                <Redirect to="/account/signin" />
              ) : (
                <>
                  <Header />
                  <SuccesMonthly monthlyB={monthlyB} />
                </>
              )}
            </Route>
            <Route exact path="/CancelMonthly">
              {is === "No" ? (
                <Redirect to="/account/signin" />
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
        <div className="ForLoading">
          <motion.h3
            style={{ color: "white" }}
            transition={{ yoyo: Infinity, duration: 2 }}
            className="ImgLoading"
          >
            Loading{" "}
            <motion.p animate={{ y: [-30, 0] }} transition={{ yoyo: Infinity }}>
              .{" "}
            </motion.p>
            <motion.p
              animate={{ y: [-30, 0] }}
              transition={{ yoyo: Infinity, delay: 0.4 }}
            >
              .{" "}
            </motion.p>
            <motion.p
              animate={{ y: [-30, 0] }}
              transition={{ yoyo: Infinity, delay: 0.8 }}
            >
              .{" "}
            </motion.p>
          </motion.h3>
        </div>
      )}
    </div>
  );
}

export default App;
