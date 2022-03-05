import React from "react";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
function MyAccount() {
  const HandleChangeName = (e) => {
    setName(e.target.value);
  };
  const setNewName = () => {
    Users.map((x) => {
      if (x.email === user.email) {
        db.collection("users")
          .doc(x.uid)
          .get()
          .then((snapshot) => {
            db.collection("users")
              .doc(x.uid)
              .update({
                name: Name,
              })
              .then(function () {
                console.log("succes Users");
                alert("Name Changed!");
              })
              .catch(function (error) {
                console.error("Error writing Users ", error);
              });
          });
      }
    });
  };
  const ariaLabel = { "aria-label": "description" };
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
  const [Users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const [Name, setName] = useState("");

  const ResetPassword = () => {
    const auth = getAuth();
    const email = user.email
    sendPasswordResetEmail(auth, email)
      .then(() => {
       console.log('sended!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  useEffect(() => {
    FUsers();
  }, []);
  return (
    <div style={{ margin: "10%" }}>
      <h1>Your Accout</h1>
      <form>
        {Users &&
          Users.map((x) => {
            if (x.email === user.email) {
              return (
                <div id={x.uid}>
                  <Box style={{ marginTop: "5%" }}>
                    <TextField
                      label="Name"
                      id="filled-size-normal"
                      defaultValue={x.name}
                      variant="filled"
                      onChange={HandleChangeName}
                    />
                    <Button onClick={setNewName} variant="contained">
                      Set new name
                    </Button>
                  </Box>
                  <Box style={{ marginTop: "5%" }}>
                    <TextField
                      disabled
                      label="Email"
                      id="filled-size-normal"
                      defaultValue={x.email}
                      variant="filled"
                    />
                    <p>Email Verifiyed!</p>
                  </Box>

                  <Box style={{ marginTop: "5%" }}>
                    <TextField
                      label="Password"
                      id="filled-size-normal"
                      defaultValue={x.password}
                      variant="filled"
                      type="password"
                    />
                    <Button onClick={ResetPassword} variant="contained">Change password</Button>
                  </Box>
                  <Box style={{ marginTop: "5%" }}>
                    <Input
                      disabled
                      defaultValue={x.uid}
                      inputProps={ariaLabel}
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(x.uid);
                        alert("copied!");
                      }}
                      variant="contained"
                      endIcon={<Fingerprint />}
                    >
                      Copy
                    </Button>
                  </Box>
                </div>
              );
            } else {
              return null;
            }
          })}
      </form>
    </div>
  );
}

export default MyAccount;
