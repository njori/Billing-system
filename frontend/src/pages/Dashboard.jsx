import { useState } from "react";

const servicesData = [
  {
    category: "General Medical Services",
    services: [
      { name: "Outpatient consultation", price: 1500 },
      { name: "Inpatient admission and treatment", price: 5000 },
      { name: "General medical checkups", price: 2000 },
      { name: "Emergency and accident services", price: 3500 },
      { name: "Pharmacy services", price: 1000 },
    ],
  },
  {
    category: "Maternal and Child Health",
    services: [
      { name: "Antenatal care (ANC)", price: 2500 },
      { name: "Delivery and maternity services", price: 8000 },
      { name: "Caesarean section (CS)", price: 15000 },
      { name: "Postnatal care", price: 2000 },
      { name: "Family planning", price: 1500 },
      { name: "Immunization clinics", price: 1200 },
      { name: "Newborn care and NICU services", price: 6000 },
    ],
  },
  {
    category: "Diagnostic Services",
    services: [
      { name: "Laboratory testing", price: 2000 },
      { name: "X-rays", price: 3000 },
      { name: "Ultrasound", price: 4000 },
      { name: "CT scans", price: 12000 },
      { name: "MRI scans (in major hospitals)", price: 20000 },
      { name: "Blood testing and pathology", price: 2500 },
    ],
  },
  {
    category: "Specialized Medical Services",
    services: [
      { name: "Cardiology (heart care)", price: 5000 },
      { name: "Oncology (cancer treatment)", price: 8000 },
      { name: "Orthopedics", price: 4000 },
      { name: "Neurology", price: 4500 },
      { name: "Psychiatry and mental health", price: 3000 },
      { name: "Dermatology", price: 2500 },
      { name: "Urology", price: 3500 },
      { name: "ENT (Ear, Nose & Throat)", price: 3000 },
      { name: "Ophthalmology (eye care)", price: 3500 },
      { name: "Dental services", price: 4000 },
    ],
  },
  {
    category: "Surgical Services",
    services: [
      { name: "General surgery", price: 20000 },
      { name: "Orthopedic surgery", price: 25000 },
      { name: "Pediatric surgery", price: 22000 },
      { name: "Neurosurgery", price: 35000 },
      { name: "Cardiothoracic surgery", price: 40000 },
      { name: "Emergency surgery", price: 18000 },
      { name: "Robotic and minimally invasive surgery", price: 50000 },
    ],
  },
  {
    category: "Critical and Specialized Care",
    services: [
      { name: "Intensive Care Unit (ICU)", price: 10000 },
      { name: "High Dependency Unit (HDU)", price: 7000 },
      { name: "Neonatal ICU (NICU)", price: 8000 },
      { name: "Dialysis and renal care", price: 5000 },
      { name: "Cancer chemotherapy and radiotherapy", price: 12000 },
    ],
  },
  {
    category: "Rehabilitation and Support Services",
    services: [
      { name: "Physiotherapy", price: 2000 },
      { name: "Occupational therapy", price: 2500 },
      { name: "Nutrition and dietetics", price: 1500 },
      { name: "Counseling services", price: 1800 },
      { name: "Social work services", price: 1200 },
    ],
  },
  {
    category: "Public Health and Community Services",
    services: [
      { name: "HIV testing and treatment", price: 3000 },
      { name: "TB clinics", price: 1500 },
      { name: "STI management", price: 2000 },
      { name: "Vaccination programs", price: 800 },
      { name: "Community health outreach", price: 5000 },
      { name: "Health education", price: 1000 },
    ],
  },
];

export default function Dashboard() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [copilotExpiryDate, setCopilotExpiryDate] = useState("");

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const totalServices = servicesData.reduce((sum, cat) => sum + cat.services.length, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const copilotExpiry = copilotExpiryDate
    ? (() => {
        const [year, month, day] = copilotExpiryDate.split("-").map(Number);
        return new Date(year, month - 1, day);
      })()
    : null;
  const isCopilotExpired = copilotExpiry ? copilotExpiry < today : null;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: 20 }}>Hospital Services Dashboard</h1>
      <div
        style={{
          marginBottom: 20,
          padding: 16,
          borderRadius: 8,
          border: "1px solid #ddd",
          backgroundColor: "#f9fafb",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Copilot Student Status Checker</h2>
        <label htmlFor="copilot-expiry-date" style={{ display: "block", marginBottom: 8 }}>
          Copilot Student expiry date:
        </label>
        <input
          id="copilot-expiry-date"
          type="date"
          value={copilotExpiryDate}
          onChange={(e) => setCopilotExpiryDate(e.target.value)}
          style={{ padding: 8, marginBottom: 10 }}
        />
        <div>
          {copilotExpiryDate
            ? isCopilotExpired
              ? "Yes — your Copilot Student plan has expired."
              : "No — your Copilot Student plan is still active."
            : "Add your expiry date to check whether your Copilot Student plan has expired."}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: 20,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: "bold" }}>{totalServices}</div>
          <div style={{ fontSize: 14 }}>Total Services</div>
        </div>
        <div
          style={{
            backgroundColor: "#2ecc71",
            color: "white",
            padding: 20,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: "bold" }}>{servicesData.length}</div>
          <div style={{ fontSize: 14 }}>Service Categories</div>
        </div>
      </div>

      <h2 style={{ color: "#2c3e50", marginBottom: 16 }}>Services by Category</h2>

      {servicesData.map((categoryData, index) => (
        <div
          key={index}
          style={{
            marginBottom: 16,
            border: "1px solid #ecf0f1",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            onClick={() => toggleCategory(categoryData.category)}
            style={{
              backgroundColor: "#34495e",
              color: "white",
              padding: 16,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            <div>
              <strong>{categoryData.category}</strong>
              <span style={{ marginLeft: 10, opacity: 0.8, fontSize: 14 }}>
                ({categoryData.services.length} services)
              </span>
            </div>
            <span style={{ fontSize: 20 }}>
              {expandedCategory === categoryData.category ? "▼" : "▶"}
            </span>
          </div>

          {expandedCategory === categoryData.category && (
            <div style={{ padding: 16 }}>
              {categoryData.services.map((service, sIndex) => (
                <div
                  key={sIndex}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: sIndex < categoryData.services.length - 1 ? "1px solid #ecf0f1" : "none",
                    backgroundColor: sIndex % 2 === 0 ? "#f8f9fa" : "white",
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                >
                  <span style={{ color: "#2c3e50" }}>{service.name}</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#2ecc71",
                      fontSize: 16,
                    }}
                  >
                    KES {service.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
