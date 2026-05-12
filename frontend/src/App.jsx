import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Patients from "./pages/Patients.jsx";
import Services from "./pages/Services.jsx";
import Invoices from "./pages/Invoices.jsx";
import Payments from "./pages/Payments.jsx";

const initialPatients = [
  {
    id: "p1",
    name: "Jane Doe",
    phone: "555-0100",
    email: "jane.doe@email.com",
    address: "123 Oak Street, Springfield, IL 62701",
    insuranceCompany: "HealthCare Plus",
    policyNumber: "HCP-789456",
  },
  {
    id: "p2",
    name: "John Smith",
    phone: "555-0142",
    email: "john.smith@email.com",
    address: "456 Elm Avenue, Springfield, IL 62702",
    insuranceCompany: "MediCare Solutions",
    policyNumber: "MCS-123456",
  },
];

const initialServices = [
  { id: "s1", name: "Consultation", price: 50 },
  { id: "s2", name: "X-Ray", price: 120 },
  { id: "s3", name: "Blood Test", price: 35 },
];

export default function App() {
  const [patients, setPatients] = useState([]);
  const [services, setServices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [invoiceCount, setInvoiceCount] = useState(0);

  const addPatient = (patient) => setPatients((prev) => [...prev, patient]);
  const addService = (service) => setServices((prev) => [...prev, service]);
  
  const createInvoice = (invoice) => {
    setInvoiceCount((prev) => prev + 1);
    setInvoices((prev) => [...prev, { ...invoice, id: String(invoiceCount + 1) }]);
  };
  
  const addPayment = (payment) => setPayments((prev) => [...prev, payment]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/patients"
          element={<Patients patients={patients} onAddPatient={addPatient} />}
        />
        <Route
          path="/services"
          element={<Services services={services} onAddService={addService} />}
        />
        <Route
          path="/invoices"
          element={
            <Invoices
              patients={patients}
              services={services}
              invoices={invoices}
              onCreateInvoice={createInvoice}
            />
          }
        />
        <Route
          path="/payments"
          element={
            <Payments
              invoices={invoices}
              payments={payments}
              onAddPayment={addPayment}
            />
          }
        />
      </Routes>
    </AppLayout>
  );
}
