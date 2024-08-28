import React, { useState } from "react";
import "./WelcomePage.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/logo1.png";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ipConfig } from "@/core/ipConfig";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, AlertDescription, AlertTitle } from "../../Components/ui/alert";
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    Visibility: false,
    message: "",
    heading: "",
    icon: <></>,
    color: "",
  });
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
  });
 
  const [passwordHide, setPasswordHide] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      if (!handleValidations()) {
        return;
      }
      const res = await axios.post(`${ipConfig}/auth/register`, {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        role: userDetails.role,
      });
       
      if(res.status===201){
        setAlert({
          Visibility: true,
          message: "User registered successfully now you can go to login page and login again",
          heading: "Register successfully!!!",
          icon: <CheckCircledIcon className="h-4 w-4" color="green" />,
          color: "green",
        });
        setTimeout(() => {
          setAlert({
            Visibility: false,
            message: "",
            heading: "",
            icon: <></>,
            color: "",
          });
          navigate("/auth/login");
        }, 3000);
      }
      
      // const response=await axios.post(`${ipConfig}/auth/register`,userDetails)
    } catch (err: unknown) {
      console.log(err, "Error from Signup");
      setAlert({
        Visibility: true,
        message: err.response.data.message,
        heading: "Error",
        icon: <ExclamationTriangleIcon className="h-4 w-4" color="red" />,
        color: "red",
      });
      setTimeout(() => {
        setAlert({
          Visibility: false,
          message: "",
          heading: "",
          icon: <></>,
          color: "",
        });
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidations = () => {
    let isValid = true;
    setValidation((prevState) => ({
      ...prevState,
      name: "",
      email: "",
      password: "",
      role: "",
      confirmPassword: "",
    }));

    if (userDetails.name.trim() === "") {
      setValidation((prevState) => ({
        ...prevState,
        name: "Name is required",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.email.trim() === "") {
      setValidation((prevState) => ({
        ...prevState,
        email: "Email is required",
      }));
      isValid = false;
      return isValid;
    } else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)
    ) {
      setValidation((prevState) => ({
        ...prevState,
        email: "Invalid email address",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.role.trim() === "") {
      setValidation((prevState) => ({
        ...prevState,
        role: "Role is required",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.password.trim() === "") {
      setValidation((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.password.trim() !== userDetails.confirmPassword.trim()) {
      setValidation((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords and confirm password do not match",
      }));
      isValid = false;
      return isValid;
    }
    return isValid;
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "black" }}>
      <div className="midSectionContainerWelcomePage">
        <div
          className="h-20 sticky top-0 right-0 left-0 "
          style={{
            backdropFilter: "blur(4px)",
            backgroundColor: "#2626264a",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: "10px",
            paddingLeft: "10px",
          }}
        >
          {" "}
          <img src={img} style={{ height: "50px" }} />
        </div>

        <div
          style={{
            // height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
          className=""
        >
          <div
            style={{
              // backgroundColor: "red",
              // height: "65vh",
              // maxWidth: "35%",

              width: "35%",
              minWidth: "35%",
              borderRadius: "20px",
              marginTop: "7px",
              marginRight: "80px",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgb(255 255 255 / 61%)",
              padding: 20,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontFamily: "Poppins",
                color: "#111827",
                fontSize: "2.5vw",
                fontWeight: "500",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
              }}
            >
              SignUp
            </div>
            <div
              style={{
                width: "95%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // height: "50%",
                gap: 6,
              }}
            >
              <TextField
                helperText={
                  <div style={{ color: "red" }}>{validation.name}</div>
                }
                id="filled-basic"
                label="Name"
                variant="outlined"
                value={userDetails.name}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  color: "white",
                  borderColor: "red",
                }}
                onChange={(event) => {
                  setUserDetails({ ...userDetails, name: event.target.value });
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9795ff6e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9795ff",
                    },
                  },
                  // "& .MuiInputLabel-root": {
                  //   color: "gray",
                  // },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#9795ff",
                  },
                }}
              />
              <TextField
                id="filled-basic"
                label="Email"
                variant="outlined"
                value={userDetails.email}
                helperText={
                  <div style={{ color: "red" }}>{validation.email}</div>
                }
                style={{
                  width: "100%",
                  marginTop: "10px",
                  color: "white",
                  borderColor: "red",
                }}
                onChange={(event) => {
                  setUserDetails({ ...userDetails, email: event.target.value });
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9795ff6e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9795ff",
                    },
                  },
                  // "& .MuiInputLabel-root": {
                  //   color: "gray",
                  // },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#9795ff",
                  },
                }}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="role"
                defaultValue=""
                style={{ marginTop: "10px" }}
                helperText={
                  <div style={{ color: "red" }}>{validation.role}</div>
                }
                onClick={(value: any) => {
                  setUserDetails({
                    ...userDetails,
                    role: value.target.innerText.toLowerCase(),
                  });
                }}
              >
                <MenuItem key={"seller"} value={"seller"}>
                  Seller
                </MenuItem>
                <MenuItem key={"buyer"} value={"buyer"}>
                  Buyer
                </MenuItem>
              </TextField>
              <TextField
                id="filled-basic"
                label="Password"
                variant="outlined"
                helperText={
                  <div style={{ color: "red" }}>{validation.password}</div>
                }
                value={userDetails.password}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  color: "white",
                  borderColor: "red",
                }}
                type={passwordHide.password ? "text" : "password"}
                onChange={(event) => {
                  setUserDetails({
                    ...userDetails,
                    password: event.target.value,
                  });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      onClick={() => {
                        setPasswordHide({
                          ...passwordHide,
                          password: !passwordHide.password,
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 12,
                      }}
                      position="end"
                    >
                      {passwordHide.password ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9795ff6e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9795ff",
                    },
                  },
                  // "& .MuiInputLabel-root": {
                  //   color: "gray",
                  // },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#9795ff",
                  },
                }}
              />
              <TextField
                id="filled-basic"
                label="Confirm Password"
                variant="outlined"
                value={userDetails.confirmPassword}
                helperText={
                  <div style={{ color: "red" }}>
                    {validation.confirmPassword}
                  </div>
                }
                style={{
                  width: "100%",
                  marginTop: "10px",
                  color: "white",
                  borderColor: "red",
                }}
                type={passwordHide.confirmPassword ? "text" : "password"}
                onChange={(event) => {
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: event.target.value,
                  });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      onClick={() => {
                        setPasswordHide({
                          ...passwordHide,
                          confirmPassword: !passwordHide.confirmPassword,
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 12,
                      }}
                      position="end"
                    >
                      {passwordHide.confirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9795ff6e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9795ff",
                    },
                  },
                  // "& .MuiInputLabel-root": {
                  //   color: "gray",
                  // },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#9795ff",
                  },
                }}
              />
            </div>
            <button
              onClick={() => {
                handleSignUp();
              }}
              style={{ width: "95%" }}
              className="mb-7 mt-7 rounded-2xl px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
              {isLoading ? <CircularProgress size={20} /> : "Sign Up"}
            </button>
            <div
              style={{
                textAlign: "center",
                color: "#2563eb",
                fontSize: "15px",
                cursor: "default",
                marginBottom: "20px",
              }}
            >
              Alreadyt have an{" "}
              <Link
                to={"/auth/login"}
                style={{
                  textDecorationLine: "underline",
                  textDecorationThickness: 1,
                }}
              >
                Account
              </Link>
              !!
            </div>
          </div>
        </div>
      </div>
      <div
        className="  "
        style={{ height: "30vh", backgroundColor: "black" }}
      ></div>
      {alert.Visibility && (
        <Alert
          style={{
            position: "sticky",
            bottom: 10,
            maxWidth: "50%",
            borderColor: alert.color,
          }}
        >
          {/* <Terminal className="h-4 w-4" /> */}
          {alert.icon}
          <AlertTitle style={{ color: alert.color }}>
            {alert.heading}
          </AlertTitle>
          <AlertDescription style={{ color: alert.color }}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default SignUp;
