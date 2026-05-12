import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  marginRight: 12,
  textDecoration: "none",
  fontWeight: isActive ? 900 : 600,
  color: 'purple',
  backgroundColor: isActive ? "orange": ""
});

export default function AppLayout({ children }) {
  return (
    <div style={{ padding: 16 }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: "0 0 30px" }}>SOLUTION K. HOSPITAL BILLING</h1>
        <nav>
          <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/patients" style={linkStyle}>Patients</NavLink>
          <NavLink to="/services" style={linkStyle}>Services</NavLink>
          <NavLink to="/invoices" style={linkStyle}>Invoices</NavLink>
          <NavLink to="/payments" style={linkStyle}>Payments</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}