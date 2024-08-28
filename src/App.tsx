import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import DashBoard from "./Pages/Home/DashBoard";
import WelcomePage from "./Pages/login/WelcomePage";
import Login from "./Pages/login/Login";
import SignUp from "./Pages/login/SignUp";
import { checkAuthLoader } from "./util/auth.ts"
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      loader: checkAuthLoader,
      children: [{ path: "", element: <DashBoard />   }],
    },
    {
      path: "/auth",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <WelcomePage />,  
        },
        { 
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
