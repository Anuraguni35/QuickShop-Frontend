import React, { useState } from "react";
import "./WelcomePage.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/heroImage1.jpg";
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
import { GalleryVerticalEnd } from "lucide-react"
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent } from "@/Components/ui/card";
import { toast } from "sonner";

function SignUp({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
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

  const handleSignUp = async (e: any) => {
    e.preventDefault();
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

      if (res.status === 201) {
        toast("Signup successfully!!!", {
          description: "Now you can login in QuickShop.",
        })
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
    } catch (err: any) {
      toast("Signup failed.", {
        description: err.response.data.message || "Something went wrong!",
        className: "bg-red-600 text-black border-red-700",
      })
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
      toast("Signup failed.", {
        description: "Name is required",
        className: "bg-red-600 text-white border-red-700",
      })
      setValidation((prevState) => ({
        ...prevState,
        name: "Name is required",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.email.trim() === "") {
      toast("Signup failed.", {
        description: "Email is required.",
        className: "bg-red-600 text-white border-red-700",
      });
      setValidation((prevState) => ({
        ...prevState,
        email: "Email is required",
      }));
      isValid = false;
      return isValid;
    } else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)
    ) {
      toast("Signup failed.", {
        description: "Invalid email address",
        className: "bg-red-600 text-white border-red-700",
      });
      setValidation((prevState) => ({
        ...prevState,
        email: "Invalid email address",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.role.trim() === "") {
      toast("Signup failed.", {
        description: "Role is required",
        className: "bg-red-600 text-white border-red-700",
      });
      setValidation((prevState) => ({
        ...prevState,
        role: "Role is required",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.password.trim() === "") {
      toast("Signup failed.", {
        description: "Password is required",
        className: "bg-red-600 text-white border-red-700",
      });
      setValidation((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.password.trim() !== userDetails.confirmPassword.trim()) {
      toast("Signup failed.", {
        description: "Passwords and confirm password do not match",
        className: "bg-red-600 text-white border-red-700",
      });
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
    // <div style={{ height: "100vh", backgroundColor: "black" }}>
    //   <div className="midSectionContainerWelcomePage">
    //     <div
    //       className="h-20 sticky top-0 right-0 left-0 "
    //       style={{
    //         backdropFilter: "blur(4px)",
    //         backgroundColor: "#2626264a",
    //         display: "flex",
    //         flexDirection: "row",
    //         alignItems: "center",
    //         paddingRight: "10px",
    //         paddingLeft: "10px",
    //       }}
    //     >
    //       {" "}
    //       <img src={img} style={{ height: "50px" }} />
    //     </div>

    //     <div
    //       style={{
    //         // height: "100%",
    //         width: "100%",
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "end",
    //       }}
    //       className=""
    //     >
    //       <div
    //         style={{
    //           // backgroundColor: "red",
    //           // height: "65vh",
    //           // maxWidth: "35%",

    //           width: "35%",
    //           minWidth: "35%",
    //           borderRadius: "20px",
    //           marginTop: "7px",
    //           marginRight: "80px",
    //           backdropFilter: "blur(5px)",
    //           backgroundColor: "rgb(255 255 255 / 61%)",
    //           padding: 20,
    //           alignItems: "center",
    //           display: "flex",
    //           flexDirection: "column",
    //         }}
    //       >
    //         <div
    //           className="font-mono"
    //           style={{
    //             fontFamily: "Poppins",
    //             color: "#111827",
    //             fontSize: "2.5vw",
    //             fontWeight: "500",
    //             display: "flex",
    //             flexDirection: "row",
    //             flexWrap: "nowrap",
    //           }}
    //         >
    //           SignUp
    //         </div>
    //         <div
    //           style={{
    //             width: "95%",
    //             display: "flex",
    //             flexDirection: "column",
    //             justifyContent: "center",
    //             // height: "50%",
    //             gap: 6,
    //           }}
    //         >
    //           <TextField
    //             helperText={
    //               <div style={{ color: "red" }}>{validation.name}</div>
    //             }
    //             id="filled-basic"
    //             label="Name"
    //             variant="outlined"
    //             value={userDetails.name}
    //             style={{
    //               width: "100%",
    //               marginTop: "10px",
    //               color: "white",
    //               borderColor: "red",
    //             }}
    //             onChange={(event) => {
    //               setUserDetails({ ...userDetails, name: event.target.value });
    //             }}
    //             sx={{
    //               "& .MuiOutlinedInput-root": {
    //                 "& fieldset": {
    //                   borderColor: "grey",
    //                 },
    //                 "&:hover fieldset": {
    //                   borderColor: "#9795ff6e",
    //                 },
    //                 "&.Mui-focused fieldset": {
    //                   borderColor: "#9795ff",
    //                 },
    //               },
    //               // "& .MuiInputLabel-root": {
    //               //   color: "gray",
    //               // },
    //               "& .MuiInputLabel-root.Mui-focused": {
    //                 color: "#9795ff",
    //               },
    //             }}
    //           />
    //           <TextField
    //             id="filled-basic"
    //             label="Email"
    //             variant="outlined"
    //             value={userDetails.email}
    //             helperText={
    //               <div style={{ color: "red" }}>{validation.email}</div>
    //             }
    //             style={{
    //               width: "100%",
    //               marginTop: "10px",
    //               color: "white",
    //               borderColor: "red",
    //             }}
    //             onChange={(event) => {
    //               setUserDetails({ ...userDetails, email: event.target.value });
    //             }}
    //             sx={{
    //               "& .MuiOutlinedInput-root": {
    //                 "& fieldset": {
    //                   borderColor: "grey",
    //                 },
    //                 "&:hover fieldset": {
    //                   borderColor: "#9795ff6e",
    //                 },
    //                 "&.Mui-focused fieldset": {
    //                   borderColor: "#9795ff",
    //                 },
    //               },
    //               // "& .MuiInputLabel-root": {
    //               //   color: "gray",
    //               // },
    //               "& .MuiInputLabel-root.Mui-focused": {
    //                 color: "#9795ff",
    //               },
    //             }}
    //           />
    //           <TextField
    //             id="outlined-select-currency"
    //             select
    //             label="role"
    //             defaultValue=""
    //             style={{ marginTop: "10px" }}
    //             helperText={
    //               <div style={{ color: "red" }}>{validation.role}</div>
    //             }
    //             onClick={(value: any) => {
    //               setUserDetails({
    //                 ...userDetails,
    //                 role: value.target.innerText.toLowerCase(),
    //               });
    //             }}
    //           >
    //             <MenuItem key={"seller"} value={"seller"}>
    //               Seller
    //             </MenuItem>
    //             <MenuItem key={"buyer"} value={"buyer"}>
    //               Buyer
    //             </MenuItem>
    //           </TextField>
    //           <TextField
    //             id="filled-basic"
    //             label="Password"
    //             variant="outlined"
    //             helperText={
    //               <div style={{ color: "red" }}>{validation.password}</div>
    //             }
    //             value={userDetails.password}
    //             style={{
    //               width: "100%",
    //               marginTop: "10px",
    //               color: "white",
    //               borderColor: "red",
    //             }}
    //             type={passwordHide.password ? "text" : "password"}
    //             onChange={(event) => {
    //               setUserDetails({
    //                 ...userDetails,
    //                 password: event.target.value,
    //               });
    //             }}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment
    //                   onClick={() => {
    //                     setPasswordHide({
    //                       ...passwordHide,
    //                       password: !passwordHide.password,
    //                     });
    //                   }}
    //                   style={{
    //                     cursor: "pointer",
    //                     position: "absolute",
    //                     right: 12,
    //                   }}
    //                   position="end"
    //                 >
    //                   {passwordHide.password ? (
    //                     <VisibilityOff />
    //                   ) : (
    //                     <Visibility />
    //                   )}
    //                 </InputAdornment>
    //               ),
    //             }}
    //             sx={{
    //               "& .MuiOutlinedInput-root": {
    //                 "& fieldset": {
    //                   borderColor: "grey",
    //                 },
    //                 "&:hover fieldset": {
    //                   borderColor: "#9795ff6e",
    //                 },
    //                 "&.Mui-focused fieldset": {
    //                   borderColor: "#9795ff",
    //                 },
    //               },
    //               // "& .MuiInputLabel-root": {
    //               //   color: "gray",
    //               // },
    //               "& .MuiInputLabel-root.Mui-focused": {
    //                 color: "#9795ff",
    //               },
    //             }}
    //           />
    //           <TextField
    //             id="filled-basic"
    //             label="Confirm Password"
    //             variant="outlined"
    //             value={userDetails.confirmPassword}
    //             helperText={
    //               <div style={{ color: "red" }}>
    //                 {validation.confirmPassword}
    //               </div>
    //             }
    //             style={{
    //               width: "100%",
    //               marginTop: "10px",
    //               color: "white",
    //               borderColor: "red",
    //             }}
    //             type={passwordHide.confirmPassword ? "text" : "password"}
    //             onChange={(event) => {
    //               setUserDetails({
    //                 ...userDetails,
    //                 confirmPassword: event.target.value,
    //               });
    //             }}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment
    //                   onClick={() => {
    //                     setPasswordHide({
    //                       ...passwordHide,
    //                       confirmPassword: !passwordHide.confirmPassword,
    //                     });
    //                   }}
    //                   style={{
    //                     cursor: "pointer",
    //                     position: "absolute",
    //                     right: 12,
    //                   }}
    //                   position="end"
    //                 >
    //                   {passwordHide.confirmPassword ? (
    //                     <VisibilityOff />
    //                   ) : (
    //                     <Visibility />
    //                   )}
    //                 </InputAdornment>
    //               ),
    //             }}
    //             sx={{
    //               "& .MuiOutlinedInput-root": {
    //                 "& fieldset": {
    //                   borderColor: "grey",
    //                 },
    //                 "&:hover fieldset": {
    //                   borderColor: "#9795ff6e",
    //                 },
    //                 "&.Mui-focused fieldset": {
    //                   borderColor: "#9795ff",
    //                 },
    //               },
    //               // "& .MuiInputLabel-root": {
    //               //   color: "gray",
    //               // },
    //               "& .MuiInputLabel-root.Mui-focused": {
    //                 color: "#9795ff",
    //               },
    //             }}
    //           />
    //         </div>
    //         <button
    //           onClick={() => {
    //             handleSignUp();
    //           }}
    //           style={{ width: "95%" }}
    //           className="mb-7 mt-7 rounded-2xl px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
    //         >
    //           {isLoading ? <CircularProgress size={20} /> : "Sign Up"}
    //         </button>
    //         <div
    //           style={{
    //             textAlign: "center",
    //             color: "#2563eb",
    //             fontSize: "15px",
    //             cursor: "default",
    //             marginBottom: "20px",
    //           }}
    //         >
    //           Alreadyt have an{" "}
    //           <Link
    //             to={"/auth/login"}
    //             style={{
    //               textDecorationLine: "underline",
    //               textDecorationThickness: 1,
    //             }}
    //           >
    //             Account
    //           </Link>
    //           !!
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     className="  "
    //     style={{ height: "30vh", backgroundColor: "black" }}
    //   ></div>
    //   {alert.Visibility && (
    //     <Alert
    //       style={{
    //         position: "sticky",
    //         bottom: 10,
    //         maxWidth: "50%",
    //         borderColor: alert.color,
    //       }}
    //     >
    //       {/* <Terminal className="h-4 w-4" /> */}
    //       {alert.icon}
    //       <AlertTitle style={{ color: alert.color }}>
    //         {alert.heading}
    //       </AlertTitle>
    //       <AlertDescription style={{ color: alert.color }}>
    //         {alert.message}
    //       </AlertDescription>
    //     </Alert>
    //   )}
    // </div>
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Card className="grid w-full max-w-4xl grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-xl shadow-lg bg-white">
        {/* Left Side: Signup Form */}
        <CardContent className="p-8 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Anurag Uniyal" required value={userDetails.name}
                  onChange={(event) => setUserDetails({ ...userDetails, name: event.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" required value={userDetails.email}
                  onChange={(event) => setUserDetails({ ...userDetails, email: event.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Role</Label>
                <Select
                  onValueChange={(value) => setUserDetails({ ...userDetails, role: value.toLowerCase() })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seller">Seller</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={userDetails.password}
                  onChange={(event) => setUserDetails({ ...userDetails, password: event.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required value={userDetails.confirmPassword}
                  onChange={(event) => setUserDetails({ ...userDetails, confirmPassword: event.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>

        {/* Right Side: Image */}
        <div className="relative hidden lg:block bg-muted">
          <img
            src={img}
            alt="Signup"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </Card>
    </div>
  );
}

export default SignUp;
