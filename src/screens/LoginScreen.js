import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./LoginScreen.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import FormSubmit from "../FormSubmit";
import FooterSecondary from "../FooterSecondary";
import { motion } from "framer-motion";
import modernLoteryLogoBlanco from '../images/modernLoteryLogoBlanco.png'
import Button from '../Button'
function LoginScreen() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__left">
        <Link to="/">
          <motion.img
            animate={{ x: 0 }}
            initial={{ x: -100 }}
            transition={{ type: "spring", duration: 0.8, stiffness: 150 }}
            src={modernLoteryLogoBlanco}
             alt=""
          />
        </Link>
        <div className="loginScreen__info">
          <motion.h1
            animate={{ x: 0 }}
            initial={{ x: -700 }}
            transition={{
              type: "spring",
              duration: 0.8,
              delay: 0.2,
              stiffness: 50,
            }}
          >
            Sign in or create an account 👨‍💻
          </motion.h1>
        </div>
      </div>
      <div className="loginScreen__right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginScreen__inputContainer">
            <TextField
              name="email"
              label="Email Address"
              type="email"
              InputLabelProps={{
                style: { color: "rgba(0,0,0,.56)" },
              }}
              InputProps={{ style: { fontWeight: "800" } }}
              className="loginScreen__input"
              inputRef={register({ required: true })}
            />
            {errors.email && (
              <div className="loginScreen__error">
                <CloseIcon fontSize="small" />
                <span>Enter an email.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="loginScreen__reportIcon"
                />
              </div>
            )}
          </div>
          <div className="loginScreen__inputContainer">
            <TextField
              name="password"
              label="Password"
              type={passwordShown ? "text" : "password"}
              InputLabelProps={{
                style: { color: "rgba(0,0,0,.56)" },
              }}
              InputProps={{ style: { fontWeight: "800" } }}
              className="loginScreen__input"
              inputRef={register({ required: true })}
            />
            {passwordShown ? (
              <VisibilityOutlinedIcon
                onClick={() => setPasswordShown(!passwordShown)}
                className="loginScreen__visibilityIcon"
              />
            ) : (
              <VisibilityOffOutlinedIcon
                onClick={() => setPasswordShown(!passwordShown)}
                className="loginScreen__visibilityIcon"
              />
            )}
            {errors.password && (
              <div className="loginScreen__error">
                <CloseIcon fontSize="small" />
                <span>Enter an password.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="loginScreen__reportIcon"
                />
              </div>
            )}
          </div>
          {/* <div className="loginBuScreen__resetLinks">
            <Link>Forgot your username?</Link>
            <Link>Forgot your password?</Link>
          </div> */}
          <FormSubmit name="Sign in" type="submit" />
        </form>
        <div className="loginScreen__rewards">
          <h4>JOIN MODERNLOTTERY</h4>
        </div>
        <div className="loginScreen__joinNow">
          <div className="loginScreen__joinNowContainer">
            <Button Text={'Join now'} To={'/account/create'} Type={1}/>
            <h4>Create an account and start investing!</h4>
            <p>
            When you enter modern lottery you accept our terms and conditions on payments and distribution of winnings
            </p>
          </div>
        </div>
        <FooterSecondary paddingLeft={30} flexDirection="column" />
      </div>
    </div>
  );
}

export default LoginScreen;
