import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCarts from "../../../hooks/useCarts";
import { toast } from "sonner";

const NavBar = () => {
  const { user, singOut } = useContext(AuthContext);
  const [cart] = useCarts();

  const handleLogOut = () => {
    singOut()
      .then(() => {
        toast.success("Sing Out done");
      })
      .catch((error) => {
        toast.error(error.code);
        toast.error(error.message);
      });
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      {user?.email ? (
        <li>
          <Link onClick={handleLogOut} to={"/login"}>
            LogOut
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-yellow-500 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            Bistro Boss
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end gap-2">
          <Link to={"/dashboard/cart"}>
            <button className="btn bg-transparent hover:bg-transparent border-none">
              <FaShoppingCart className="text-4xl" />
              <div className="badge badge-warning -mt-4 -ml-4 ">
                {cart?.length}
              </div>
            </button>
          </Link>

          <Link to={"/dashboard"}>
            <figure title={user?.displayName}>
              <img
                className="w-10 h-10 rounded-full border-2 border-white bg-yellow-400"
                src={`${user?.photoURL}`}
                alt=""
              />
            </figure>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
