import React, { useState } from "react";
import api from "../api";

export default function ApplyLeave() {
  const [type, setType] = useState("annual");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/leaves", { type, startDate: start, endDate: end, reason });
    alert("Leave applied successfully");
    window.location = "/my-leaves";
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title mb-4 text-center">Apply for Leave</h2>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Leave Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-select"
                >
                  <option value="annual">Annual</option>
                  <option value="sick">Sick</option>
                  <option value="casual">Casual</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-control"
                  placeholder="Enter reason"
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
