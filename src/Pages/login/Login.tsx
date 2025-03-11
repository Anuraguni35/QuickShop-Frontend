import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/logo1.png";
import img2 from '../../assets/heroImage1.jpg'
import loginpage from '../../assets/loginpagebackground.jpg'
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
import { GalleryVerticalEnd } from "lucide-react"
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { toast } from "sonner";
function Login({
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
    email: "",
    password: "",

    confirmPassword: "",
  });

  const [validation, setValidation]: any = useState({
    email: "",
    password: "",

    confirmPassword: "",
  });

  const [passwordHide, setPasswordHide] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      // setIsLoading(true);
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
        toast("Login successfully!!!", {
          description: "Now you can explore QuickShop",
        })
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
      toast("Login failed.", {
        description: err.response.data.message || "Something went wrong!",
        className: "bg-red-600 text-white border-red-700",
      })
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
    setValidation((prevState: any) => ({
      ...prevState,

      email: "",
      password: "",

      confirmPassword: "",
    }));

    if (userDetails.email.trim() === "") {
      toast("Login failed.", {
        description: "Email is required",
        className: "bg-red-600 text-white border-red-700",
      })
      setValidation((prevState: any) => ({
        ...prevState,
        email: "Email is required",
      }));
      isValid = false;
      return isValid;
    } else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)
    ) {
      toast("Login failed.", {
        description: "Invalid email address",
        className: "bg-red-600 text-white border-red-700",
      })
      setValidation((prevState: any) => ({
        ...prevState,
        email: "Invalid email address",
      }));
      isValid = false;
      return isValid;
    }

    if (userDetails.password.trim() === "") {
      toast("Login failed.", {
        description: "Password is required",
        className: "bg-red-600 text-white border-red-700",
      })
      setValidation((prevState: any) => ({
        ...prevState,
        password: "Password is required",
      }));
      isValid = false;
      return isValid;
    }
    if (userDetails.password.trim() !== userDetails.confirmPassword.trim()) {
      toast("Login failed.", {
        description: "Passwords and confirm password do not match",
        className: "bg-red-600 text-white border-red-700",
      })
      setValidation((prevState: any) => ({
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
    //           height: "65vh",
    //           // maxWidth: "35%",

    //           width: "35%",
    //           minWidth: "35%",
    //           borderRadius: "20px",
    //           marginTop: "50px",
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
    //             marginBottom: "10px",
    //           }}
    //         >
    //           Login
    //         </div>
    //         <div
    //           style={{
    //             width: "90%",
    //             display: "flex",
    //             flexDirection: "column",
    //             justifyContent: "center",
    //             height: "50%",
    //             gap: 6,
    //           }}
    //         >
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
    //           <div
    //             style={{
    //               textAlign: "end",
    //               color: "#2563eb",
    //               cursor: "pointer",
    //             }}
    //           >
    //             Forgot Password?
    //           </div>
    //         </div>
    //         <button
    //           onClick={() => {
    //             handleLogin();
    //           }}
    //           style={{ width: "90%" }}
    //           className="mb-7 mt-7 rounded-2xl px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
    //         >
    //           {isLoading ? <CircularProgress size={20} /> : "Login"}
    //         </button>
    //         <div
    //           style={{
    //             textAlign: "center",
    //             color: "#2563eb",
    //             fontSize: "15px",
    //             cursor: "default",
    //           }}
    //         >
    //           Don't have an{" "}
    //           <Link
    //             to={"/auth/signup"}
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
      <Card className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 shadow-lg">
        {/* Left Side - Form */}
        <CardContent className="p-6 md:p-10 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to log in to your account
            </p>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmpassword">Confirm password</Label>
              <Input
                id="confirmpassword"
                type="password"
                required
                value={userDetails.confirmPassword}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <Button type="submit" className="w-full"
            >
              Login
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>

        {/* Right Side - Image */}
        <div className="hidden lg:block relative">
          <img
            src={img2}
            alt="Login Illustration"
            className="absolute inset-0 h-full w-full object-cover rounded-r-md dark:brightness-75"
          />
        </div>
      </Card>
    </div>
  );
}

export default Login;
