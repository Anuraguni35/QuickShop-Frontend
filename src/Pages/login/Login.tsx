import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/logo1.png";
// import Input from "../../Components/component/Input";
import TextField from "@mui/material/TextField";
import { Alert, AlertDescription, AlertTitle } from "../../Components/ui/alert";
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ipConfig } from "@/core/ipConfig";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
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
    email: "",
    password: "",

    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    email: "",
    password: "",

    confirmPassword: "",
  });

  const [passwordHide, setPasswordHide] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (!handleValidations()) {
        return;
      }

      const res = await axios.post(`${ipConfig}/auth/login`, {
        email: userDetails.email,
        password: userDetails.password,
      });
      console.log(res, 'response from login');
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("token", res.data.tokens.token);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("role", res.data.user.role);
        setAlert({
          Visibility: true,
          message: "User Login successfully now you can explore QuickShop",
          heading: "Login successfully!!!",
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
          navigate("/");
          setUserDetails({
            email: "",
            password: "",
            confirmPassword: "",
          });
        }, 3000);
      }
    } catch (err: any) {
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

      email: "",
      password: "",

      confirmPassword: "",
    }));

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
  // const navigation=useNavigate()
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
              height: "65vh",
              // maxWidth: "35%",

              width: "35%",
              minWidth: "35%",
              borderRadius: "20px",
              marginTop: "50px",
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
                marginBottom: "10px",
              }}
            >
              Login
            </div>
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "50%",
                gap: 6,
              }}
            >
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
              <div
                style={{
                  textAlign: "end",
                  color: "#2563eb",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </div>
            </div>
            <button
              onClick={() => {
                handleLogin();
              }}
              style={{ width: "90%" }}
              className="mb-7 mt-7 rounded-2xl px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
              {isLoading ? <CircularProgress size={20} /> : "Login"}
            </button>
            <div
              style={{
                textAlign: "center",
                color: "#2563eb",
                fontSize: "15px",
                cursor: "default",
              }}
            >
              Don't have an{" "}
              <Link
                to={"/auth/signup"}
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

export default Login;
