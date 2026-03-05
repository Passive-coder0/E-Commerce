import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Scissors } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    window.location.href = "/login";
  };

  useEffect(() => {
    setIsAdmin(user?.user?.role === "admin");
  }, [user]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* Main bar */}
      <div className="bg-gray-950/95 backdrop-blur-md border-b border-white/5 shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105">
              <Scissors size={17} className="text-white" strokeWidth={2.2} />
            </div>
            <div className="leading-none select-none">
              <p className="text-[17px] font-bold tracking-tight text-white">
                Thread<span className="text-emerald-400">Smith</span>
              </p>
              <p className="text-[9px] tracking-[0.28em] text-gray-500 font-medium uppercase mt-0.5">
                Men&apos;s Fashion
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "text-emerald-400 bg-emerald-400/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Homepage
            </Link>

            {user && (
              <Link
                to="/cart"
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/cart")
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <ShoppingCart size={16} />
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-emerald-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center px-1 shadow-sm shadow-emerald-500/40">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/secret-dashboard")
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Lock size={14} />
                Dashboard
              </Link>
            )}

            <div className="mx-2 h-4 w-px bg-white/10" />

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <LogOut size={15} />
                Log Out
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200"
                >
                  <UserPlus size={15} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 text-gray-300 hover:border-emerald-500/60 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-200"
                >
                  <LogIn size={15} />
                  Login
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile: cart + animated burger */}
          <div className="flex sm:hidden items-center gap-1">
            {user && (
              <Link
                to="/cart"
                className="relative p-2.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-white/5 transition-all duration-200"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 min-w-[15px] h-[15px] bg-emerald-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center px-0.5">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
                    menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-950/98 border-b border-white/5 backdrop-blur-md shadow-2xl">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            <Link
              to="/"
              className={`flex justify-center items-center gap-3 px-4 py-3 rounded-xl text-center text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "text-emerald-400 bg-emerald-400/10"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive("/secret-dashboard")
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Lock size={15} />
                Dashboard
              </Link>
            )}

            <div className="my-1 h-px bg-white/5" />

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <LogOut size={15} />
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20 transition-all duration-200"
                >
                  <UserPlus size={15} />
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-white/10 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-200"
                >
                  <LogIn size={15} />
                  Sign In
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;