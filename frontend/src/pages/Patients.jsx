import { useState } from "react";

export default function Patients({ patients, onAddPatient }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addPatient = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Patient name is required");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!address.trim()) {
      setError("Address is required");
      return;
    }

    onAddPatient({
      id: `p-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      insuranceCompany: insuranceCompany.trim(),
      policyNumber: policyNumber.trim(),
    });

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setInsuranceCompany("");
    setPolicyNumber("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patients</h2>

      <form
        onSubmit={addPatient}
        style={{
          marginBottom: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Phone *
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Email *
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Address *
          </label>
          <input
            type="text"
            placeholder="Enter street address, city, state, zip"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Insurance Company
          </label>
          <input
            type="text"
            placeholder="Enter insurance company (optional)"
            value={insuranceCompany}
            onChange={(e) => setInsuranceCompany(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Policy Number
          </label>
          <input
            type="text"
            placeholder="Enter policy number (optional)"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: 12, fontWeight: "bold" }}>
            ⚠ {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          Add Patient
        </button>
      </form>

      <h3>Patient List</h3>
      {patients.length === 0 ? (
        <div style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 4 }}>
          No patients added yet
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Insurance Company</th>
                <th>Policy Number</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: "bold" }}>{p.name}</td>
                  <td>{p.phone}</td>
                  <td>{p.email}</td>
                  <td>{p.address}</td>
                  <td>{p.insuranceCompany || "—"}</td>
                  <td>{p.policyNumber || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
