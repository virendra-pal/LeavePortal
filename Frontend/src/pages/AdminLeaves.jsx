import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/admin/leaves").then((r) => setLeaves(r.data));
  }, []);

  const act = async (id, op) => {
    try {
      await api.patch(`/admin/leaves/${id}/${op}`);
      setLeaves((prev) =>
        prev.map((l) =>
          l._id === id
            ? { ...l, status: op === "approve" ? "approved" : "rejected" }
            : l
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">All Leave Requests</h2>
      {leaves.length === 0 ? (
        <div className="alert alert-info text-center">
          No leave requests available.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l._id}>
                  <td>{l.employee?.name || "Unknown"}</td>
                  <td className="text-capitalize">{l.type}</td>
                  <td>{new Date(l.startDate).toLocaleDateString()}</td>
                  <td>{new Date(l.endDate).toLocaleDateString()}</td>
                  <td>{l.reason || "-"}</td>
                  <td>
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
                  </td>
                  <td>
                    {l.status === "pending" && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => act(l._id, "approve")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => act(l._id, "reject")}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
