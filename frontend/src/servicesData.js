export const allServicesData = [
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

export const getAllServicesList = () => {
  return allServicesData.flatMap((cat) => cat.services);
};

export const getServicePrice = (serviceName) => {
  for (const category of allServicesData) {
    const service = category.services.find((s) => s.name === serviceName);
    if (service) return service.price;
  }
  return null;
};
