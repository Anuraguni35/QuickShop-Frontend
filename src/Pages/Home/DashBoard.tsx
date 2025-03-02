import NavBar from "../../Components/component/navBar.tsx";
import { Outlet } from "react-router-dom";
function DashBoard() {
  const role = localStorage.getItem('role');
  return (
    <div>
      <NavBar config={{ page: "dashBoard" }} />
      {
        role === "buyer" ? "Buyer dashboard" : "Seller dashboard"
      }
    </div>
  );
}

export default DashBoard;
