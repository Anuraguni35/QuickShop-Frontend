import React from "react";
import NavBar from "../../Components/component/navBar.tsx";
import { Outlet } from "react-router-dom";
function DashBoard() {
  return (
    <div>
      <NavBar config={{page:"dashBoard"}}/>
       Dashboard
    </div>
  );
}

export default DashBoard;
