import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
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
import FloatButton from "./FloatButton";
import MyAccount from "./About/myAcount/MyAccount";
import VerifyEmail from "./VerifyEmail";
import Train from "./TrainMyself/Train";
import { getAuth } from "firebase/auth";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setProfile(getAuth());
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

  return (
    <div className="app">
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
          {/* For the form
          <Route exact path="/form">
                <Header />
                <FormInvestingCoin />
          </Route> */}

          <Route exact path="/formCoin">
            {!user ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header />
                <FormInvestingCoin />
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
            {!user ? (
              <Redirect to="/account/signin" />
            ) : (
              <>
                <Header menuPage />
                <MyBets />
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
              <Redirect to="/account/signin" />
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

          <Route exact path="/menu/featured">
            <Header />
            <FeaturedScreen />
            <Fade>
              <Footer />
            </Fade>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
