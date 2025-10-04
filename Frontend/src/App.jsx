import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import AdminLeaves from "./pages/AdminLeaves";

export default function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Leave Portal</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              {!user?.name && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}

              {user?.role === "employee" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/apply">Apply Leave</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-leaves">My Leaves</Link>
                  </li>
                </>
              )}

              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              )}
            </ul>

            {user?.name && (
              <button
                className="btn btn-outline-light"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply" element={<ApplyLeave />} />
          <Route path="/my-leaves" element={<MyLeaves />} />
          <Route path="/admin" element={<AdminLeaves />} />
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="mb-3">HR Leave Application Portal</h1>
                {user?.name ? (
                  <p>Welcome, {user.name} ({user.role})</p>
                ) : (
                  <p>Please login or register to continue</p>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
