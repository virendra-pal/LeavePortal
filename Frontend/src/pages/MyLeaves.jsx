import React, { useEffect, useState } from "react";
import api from "../api";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/leaves/mine").then((r) => setLeaves(r.data));
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">My Leave Requests</h2>
      {leaves.length === 0 ? (
        <div className="alert alert-info text-center">
          You have not applied for any leaves yet.
        </div>
      ) : (
        <div className="row">
          {leaves.map((l) => (
            <div className="col-md-6 mb-3" key={l._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{l.type} Leave</h5>
                  <p className="card-text mb-1">
                    <strong>From:</strong>{" "}
                    {new Date(l.startDate).toLocaleDateString()} <br />
                    <strong>To:</strong>{" "}
                    {new Date(l.endDate).toLocaleDateString()}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        l.status === "approved"
                          ? "badge bg-success"
                          : l.status === "rejected"
                          ? "badge bg-danger"
                          : l.status === "cancelled"
                          ? "badge bg-secondary"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {l.status}
                    </span>
                  </p>
                  {l.reason && (
                    <p className="card-text">
                      <strong>Reason:</strong> {l.reason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
