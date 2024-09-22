import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import Home from "./Home";
import Contact from "./Contact";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ConfirmSignUp from "./Auth/ConfirmSignUp";
import UserProfile from "./Auth/UserProfile";
import MyToken from "./MyToken";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import RouteGuard from "./RouteGuard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/userprofile">User Profile</Link>
            </li>
            <li>
              <Link to="/mytoken">My Token</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-signup" element={<ConfirmSignUp />} />

            <Route
              path="/userprofile"
              element={
                <RouteGuard>
                  <UserProfile />
                </RouteGuard>
              }
            />
            <Route
              path="/mytoken"
              element={
                <RouteGuard>
                  <MyToken />
                </RouteGuard>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
