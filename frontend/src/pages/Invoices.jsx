import { useEffect, useMemo, useState } from "react";
import { generateInvoicePDF } from "../pdfGenerator";

export default function Invoices({
  patients,
  services,
  invoices,
  onCreateInvoice,
}) {
  const [patientId, setPatientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!patientId && patients.length > 0) {
      setPatientId(patients[0].id);
    }
  }, [patients, patientId]);

  useEffect(() => {
    if (!serviceId && services.length > 0) {
      setServiceId(services[0].id);
    }
  }, [services, serviceId]);

  const addItem = (e) => {
    e.preventDefault();
    const service = services.find((s) => s.id === serviceId);
    const quantity = Number(qty);

    if (!service || Number.isNaN(quantity) || quantity <= 0) return;

    const lineTotal = service.price * quantity;
    setItems((prev) => [
      ...prev,
      {
        id: `${service.id}-${Date.now()}`,
        serviceName: service.name,
        price: service.price,
        quantity,
        lineTotal,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.lineTotal, 0),
    [items]
  );

  const selectedPatient = patients.find((p) => p.id === patientId);
  const canCreateInvoice = selectedPatient && items.length > 0;

  const createInvoice = () => {
    if (!canCreateInvoice) return;
    onCreateInvoice({
      id: `inv-${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      items,
      total,
    });
    setItems([]);
    setQty(1);
  };

  const downloadInvoice = (invoice) => {
    generateInvoicePDF(invoice, patients);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoices</h2>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>Patient:</label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={addItem} style={{ marginBottom: 16 }}>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          style={{ marginRight: 8 }}
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} (Ksh{s.price})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          style={{ width: 80, marginRight: 8 }}
        />
        <button type="submit">Add item</button>
      </form>

      <table border="1" cellPadding="6" style={{ width: "100%", marginBottom: 16 }}>
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Line Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.serviceName}</td>
              <td>Ksh{i.price.toFixed(2)}</td>
              <td>{i.quantity}</td>
              <td>Ksh{i.lineTotal.toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(i.id)}>Remove</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No items yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginBottom: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 4 }}>
        <h3 style={{ marginTop: 0 }}>Selected Patient Information</h3>
        {selectedPatient ? (
          <div style={{ fontSize: 14 }}>
            <p>
              <strong>Name:</strong> {selectedPatient.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPatient.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedPatient.email}
            </p>
            <p>
              <strong>Address:</strong> {selectedPatient.address}
            </p>
            {selectedPatient.insuranceCompany && (
              <p>
                <strong>Insurance:</strong> {selectedPatient.insuranceCompany}
                {selectedPatient.policyNumber && ` (Policy: ${selectedPatient.policyNumber})`}
              </p>
            )}
          </div>
        ) : (
          <div>No patient selected</div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={createInvoice} disabled={!canCreateInvoice} style={{ padding: "10px 20px" }}>
          Create Invoice
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Created Invoices</h3>
        {invoices.length === 0 ? (
          <div>No invoices created yet</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f0f0f0" }}>
                <tr>
                  <th>Invoice ID</th>
                  <th>Patient Name</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ fontFamily: "monospace", fontSize: 12 }}>{inv.id}</td>
                    <td>{inv.patientName}</td>
                    <td>{inv.items.length} item(s)</td>
                    <td style={{ fontWeight: "bold" }}>KSH{inv.total.toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => downloadInvoice(inv)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          fontSize: 12,
                        }}
                      >
                        📥 Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
