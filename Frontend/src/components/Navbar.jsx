import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import logo from "/icon.png";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const [isAdmin, setIsAdmin] = useState("customer");
  const [menuOpen, setMenuOpen] = useState(false); // Controls the burger menu

  useEffect(() => {
    if (user?.user?.role === "admin") {
      setIsAdmin("admin");
    }
  }, [user]);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* This is the Logo */}
        <Link to="/" className="text-xl md:text-3xl font-bold text-emerald-400 md:ml-2 flex items-center gap-2 md:gap-6">
          <img src={logo} alt="Logo Image" width="30px" height="30px" />
          Threadsmith Men’s Fashion
        </Link>

        {/* Burger Button (Visible on Small Screens only) */}
        <button
          className="sm:hidden text-gray-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navbar Links */}
        <nav
          className={`absolute sm:static top-14 left-0 w-full sm:w-auto sm:flex bg-gray-900 sm:bg-transparent p-4 sm:p-0 sm:space-x-4 transform transition-all duration-300 ease-in-out ${
            menuOpen 
              ? "block opacity-100 translate-y-0 scale-100 pointer-events-auto" 
              : "block opacity-0 -translate-y-4 scale-95 pointer-events-none sm:block sm:opacity-100 sm:translate-y-0 sm:scale-100 sm:pointer-events-auto"
          }`}
        >
          <Link to="/" className="flex items-center justify-center text-gray-300 hover:text-emerald-400 py-2 sm:py-0">
            Home
          </Link>
          {user && (
            <Link
              to="/cart"
              className="relative flex items-center justify-center text-gray-300 hover:text-emerald-400 py-2 sm:py-0"
            >
              <ShoppingCart className="inline-block mr-1" size={20} />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="block bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 text-center rounded-md sm:inline-flex items-center"
            >
              <Lock className="inline-block mr-1" size={18} />
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              className="flex bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md sm:inline-flex justify-center items-center w-full"
              onClick={logout}
            >
              <LogOut size={18} />
              <span className="ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md items-center sm:inline-flex"
              >
                <UserPlus className="mr-2" size={18} />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="flex bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md items-center sm:inline-flex"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
