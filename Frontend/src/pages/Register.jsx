import React, { useState } from "react";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // default
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      setMessage("Account created successfully. You can now login.");
      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title mb-4 text-center">Create Account</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
