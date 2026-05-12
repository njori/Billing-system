import { useState } from "react";
import { getAllServicesList, getServicePrice } from "../servicesData.js";

export default function Services({ services, onAddService }) {
  const [selectedService, setSelectedService] = useState("");
  const [price, setPrice] = useState("");
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const allServices = getAllServicesList();

  const handleServiceSelect = (e) => {
    const serviceName = e.target.value;
    setSelectedService(serviceName);
    const servicePrice = getServicePrice(serviceName);
    if (servicePrice !== null) {
      setPrice(servicePrice);
    }
  };

  const addService = (e) => {
    e.preventDefault();
    
    let serviceName = "";
    let servicePrice = 0;

    if (useCustom) {
      if (!customName.trim()) {
        alert("Please enter a custom service name");
        return;
      }
      const customPriceNum = Number(customPrice);
      if (Number.isNaN(customPriceNum) || customPriceNum < 0) {
        alert("Please enter a valid price");
        return;
      }
      serviceName = customName.trim();
      servicePrice = customPriceNum;
    } else {
      if (!selectedService) {
        alert("Please select a service");
        return;
      }
      serviceName = selectedService;
      servicePrice = Number(price);
    }

    onAddService({
      id: `s-${Date.now()}`,
      name: serviceName,
      price: servicePrice,
    });

    setSelectedService("");
    setPrice("");
    setCustomName("");
    setCustomPrice("");
    setUseCustom(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Services</h2>

      <form onSubmit={addService} style={{ marginBottom: 24, padding: 16, backgroundColor: "#f9f9f9", borderRadius: 8, border: "1px solid #ddd" }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
            <input
              type="radio"
              name="serviceType"
              checked={!useCustom}
              onChange={() => setUseCustom(false)}
              style={{ marginRight: 8 }}
            />
            Select from Standard Services
          </label>
          
          {!useCustom && (
            <div style={{ marginLeft: 24 }}>
              <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
                Service Name *
              </label>
              <select
                value={selectedService}
                onChange={handleServiceSelect}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  fontSize: 14,
                }}
              >
                <option value="">-- Choose a service --</option>
                {allServices.map((service, idx) => (
                  <option key={idx} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>

              <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
                Price (KES) *
              </label>
              <input
                type="number"
                placeholder="Price will auto-fill"
                value={price}
                readOnly
                style={{
                  width: "100%",
                  padding: 10,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  backgroundColor: "#e8f5e9",
                  fontWeight: "bold",
                }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
            <input
              type="radio"
              name="serviceType"
              checked={useCustom}
              onChange={() => setUseCustom(true)}
              style={{ marginRight: 8 }}
            />
            Add Custom Service
          </label>

          {useCustom && (
            <div style={{ marginLeft: 24 }}>
              <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
                Service Name *
              </label>
              <input
                type="text"
                placeholder="Enter custom service name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />

              <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
                Price (KES) *
              </label>
              <input
                type="number"
                placeholder="Enter price"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
            </div>
          )}
        </div>

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
          Add Service
        </button>
      </form>

      <h3>Added Services</h3>
      {services.length === 0 ? (
        <div style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 4 }}>
          No services added yet
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>Service Name</th>
                <th>Price (KES)</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td style={{ fontWeight: "bold", color: "#2ecc71" }}>
                    KES {s.price.toLocaleString()}
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
