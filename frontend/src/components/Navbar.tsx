import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
  Brain,
  Calendar,
  FileText,
  Newspaper,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // true if token exisis

  //  useEffect(()=>{
  //   const token = !!localStorage.getItem("token");
  //    setIsLoggedIn(token)
  //  },[])

  return (
    <nav className="bg-teal-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">TestPal</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
              >
                Home
              </Link>
              <Link
                to="/generate-paper"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
              >
                <span className="flex items-center">
                  {" "}
                  <Newspaper className="h-4 w-4 mr-1" />
                  Generate Paper
                </span>
              </Link>
              <Link
                to="/daily-practice"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
              >
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Daily Practice
                </span>
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
              >
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Previous Tests
                </span>
              </Link>

              {/* <Link
                to="/ai-assistant"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
              >
                <span className="flex items-center">
                  <Brain className="h-4 w-4 mr-1" />
                  AI Assistant
                </span>
              </Link> */}
            </div>
          </div>

          {!isLoggedIn ? (
            <>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-white text-teal-600 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-2 px-4 py-2 rounded-md text-sm font-medium bg-teal-800 text-white hover:bg-slate-700"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    onClick={() => {
                      const confirmLogout = window.confirm(
                        "Are you sure you want to logout?"
                      );
                      if (confirmLogout) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        window.location.href = "/login";
                      }
                    }}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-white text-teal-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>{" "}
            </>
          )}
          {/* */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-orange-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-600"
            >
              Home
            </Link>
            <Link
              to="/generate-paper"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
            >
              <span className="flex items-center">
                {" "}
                <Newspaper className="h-4 w-4 mr-1" />
                Generate Paper
              </span>
            </Link>
            <Link
              to="/previous-years"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-600"
            >
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Previous Years
              </span>
            </Link>
            <Link
              to="/book-questions"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-600"
            >
              <span className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                Book Questions
              </span>
            </Link>
          </div>

          <div className="pt-4 pb-3 border-t border-indigo-500">
            <div className="px-2 space-y-1">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
