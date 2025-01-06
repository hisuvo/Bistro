import {
  FaBook,
  FaConnectdevelop,
  FaHistory,
  FaHome,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { MdReviews } from "react-icons/md";
import { RiReservedLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";

function Dashborad() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="hidden overflow-y-auto md:block md:col-span-3 px-4 py-2 bg-yellow-500 max-h-screen">
        <div className="text-center">
          <h1 className="text-2xl uppercase font-bold font-mono">
            Bistro Boss
          </h1>
          <h2 className="text-xl uppercase font-semibold font-mono tracking-[0.3rem]">
            Restaurant
          </h2>
        </div>
        <ul className="menu mt-8 uppercase">
          <li>
            <NavLink to={"/dashboard/home"}>
              {" "}
              <FaHome />
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/reservation"}>
              {" "}
              <RiReservedLine /> reservation
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/payment-history"}>
              {" "}
              <FaHistory /> pay history
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/cart"}>
              {" "}
              <FaShoppingCart /> My Cart
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/add-reviews"}>
              {" "}
              <MdReviews /> add review
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/my-booking"}>
              {" "}
              <FaBook /> my booking
            </NavLink>
          </li>
        </ul>
        <div className="divider"></div>
        <ul className="menu mt-8 uppercase">
          <li>
            <NavLink to={"/"}>
              {" "}
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/order/salad"}>
              {" "}
              <IoMenu /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/payment-history"}>
              {" "}
              <FaShoppingBasket /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/cart"}>
              {" "}
              <FaConnectdevelop /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="col-span-full md:col-span-9 overflow-y-auto max-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashborad;
