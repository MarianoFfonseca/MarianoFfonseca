import React, { useEffect } from "react";
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
import FormInvestingCoin from "./FormInvesting/FormInvestingCoin"
import FormInvestingDay from "./FormInvesting/FormInvestingDay"
import MyBets from "./About/myBets/MyBets";
import Succes from "./FormInvesting/AfterCheckOut/Succes"
import Cancel from "./FormInvesting/AfterCheckOut/Cancel"
import Analisis from './About/myBets/Analisis'
import FloatButton from './FloatButton'
import MyAccount from './About/myAcount/MyAccount'
import VerifyEmail from "./VerifyEmail";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
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
                <Header />  
                <FormInvestingCoin />
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
                <Header menuPage/>  
                <MyBets/>
          </Route>
          <Route exact path="/about/Analisis">
                <Header menuPage/>  
                <Analisis/>
          </Route>
          <Route exact path="/about/MyAccount">
                <Header menuPage/>  
                <MyAccount/>
          </Route>
          <Route exact path="/VerifyEmail">            
                <VerifyEmail/>
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
