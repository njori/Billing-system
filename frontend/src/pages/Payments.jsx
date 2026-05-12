import { useEffect, useMemo, useState } from "react";
import { generatePaymentReportPDF } from "../pdfGenerator";

export default function Payments({ invoices, payments, onAddPayment }) {
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!invoiceId && invoices.length > 0) {
      setInvoiceId(invoices[0].id);
    }
  }, [invoices, invoiceId]);

  const selectedInvoice = invoices.find((i) => i.id === invoiceId);

  const addPayment = (e) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!selectedInvoice || Number.isNaN(amt) || amt <= 0) return;

    onAddPayment({
      id: `pay-${Date.now()}`,
      invoiceId: selectedInvoice.id,
      patientName: selectedInvoice.patientName,
      amount: amt,
    });
    setAmount("");
  };

  const totalPaid = useMemo(() => {
    return payments
      .filter((p) => p.invoiceId === invoiceId)
      .reduce((sum, p) => sum + p.amount, 0);
  }, [payments, invoiceId]);

  const balance = useMemo(() => {
    return (selectedInvoice?.total ?? 0) - totalPaid;
  }, [selectedInvoice, totalPaid]);

  const downloadPaymentReport = () => {
    if (selectedInvoice) {
      generatePaymentReportPDF(selectedInvoice, payments);
    }
  };

  if (invoices.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Payments</h2>
        <div>Create an invoice first to record payments.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payments</h2>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>Invoice:</label>
        <select value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)}>
          {invoices.map((i) => (
            <option key={i.id} value={i.id}>
              {i.id} — {i.patientName} (Ksh{i.total})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={addPayment} style={{ marginBottom: 16 }}>
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginRight: 8, padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Record Payment
        </button>
      </form>

      <div
        style={{
          marginBottom: 16,
          padding: 12,
          backgroundColor: "#f0f0f0",
          borderRadius: 4,
          border: "1px solid #ddd",
        }}
      >
        <strong>Invoice Total:</strong> Ksh{selectedInvoice?.total?.toFixed(2) ?? "0.00"}
        <br />
        <strong>Total Paid:</strong> Ksh{totalPaid.toFixed(2)}
        <br />
        <strong>Balance Due:</strong>{" "}
        <span style={{ color: balance > 0 ? "red" : "green", fontWeight: "bold" }}>
          Ksh{balance.toFixed(2)}
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={downloadPaymentReport}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0056b3",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          📥 Download Payment Report PDF
        </button>
      </div>

      <h3>Payment History</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>Invoice</th>
            <th>Patient</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments
            .filter((p) => p.invoiceId === invoiceId)
            .map((p) => (
              <tr key={p.id}>
                <td style={{ fontFamily: "monospace", fontSize: 12 }}>{p.invoiceId}</td>
                <td>{p.patientName}</td>
                <td style={{ fontWeight: "bold" }}>Ksh{p.amount.toFixed(2)}</td>
                <td>{new Date(parseInt(p.id.split("-")[1])).toLocaleDateString()}</td>
              </tr>
            ))}
          {payments.filter((p) => p.invoiceId === invoiceId).length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No payments yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
