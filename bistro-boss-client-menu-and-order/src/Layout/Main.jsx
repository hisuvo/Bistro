import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const Main = () => {
  const location = useLocation();
  const isLocationLogin = location.pathname.includes("login");
  const isLocationRegister = location.pathname.includes("register");

  return (
    <div>
      {isLocationLogin || isLocationRegister || <NavBar></NavBar>}
      <Outlet></Outlet>
      {isLocationLogin || isLocationRegister || <Footer></Footer>}
    </div>
  );
};

export default Main;
