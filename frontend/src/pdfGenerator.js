import jsPDF from "jspdf";

export const generateInvoicePDF = (invoice, patients) => {
  const patient = patients.find((p) => p.id === invoice.patientId);
  if (!patient) return;

  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(20);
  doc.text("INVOICE", 20, y);
  y += 15;

  doc.setFontSize(12);
  doc.text(`Invoice #: ${invoice.id}`, 20, y);
  y += 7;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);
  y += 15;

  doc.setFontSize(11);
  doc.text("Bill To:", 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.text(`${patient.name}`, 20, y);
  y += 5;
  doc.text(`${patient.address}`, 20, y);
  y += 5;
  doc.text(`Phone: ${patient.phone}`, 20, y);
  y += 5;
  doc.text(`Email: ${patient.email}`, 20, y);

  if (patient.insuranceCompany) {
    y += 7;
    doc.setFontSize(11);
    doc.text("Insurance Information:", 20, y);
    y += 5;
    doc.setFontSize(10);
    doc.text(`Company: ${patient.insuranceCompany}`, 20, y);
    y += 5;
    doc.text(`Policy #: ${patient.policyNumber || "N/A"}`, 20, y);
  }

  y += 15;

  doc.setFontSize(11);
  doc.setFillColor(220, 220, 220);
  doc.rect(20, y - 5, 170, 7, "F");
  doc.text("Service", 22, y);
  doc.text("Qty", 120, y);
  doc.text("Unit Price", 140, y);
  doc.text("Amount", 170, y);
  y += 10;

  doc.setFontSize(10);
  invoice.items.forEach((item) => {
    doc.text(item.serviceName, 22, y);
    doc.text(item.quantity.toString(), 120, y);
    doc.text(`$${item.price.toFixed(2)}`, 140, y);
    doc.text(`$${item.lineTotal.toFixed(2)}`, 170, y);
    y += 7;
  });

  y += 5;
  doc.setFillColor(240, 240, 240);
  doc.rect(20, y - 5, 170, 7, "F");
  doc.setFontSize(11);
  doc.setFont(undefined, "bold");
  doc.text("TOTAL", 22, y);
  doc.text(`Ksh${invoice.total.toFixed(2)}`, 170, y);

  doc.save(`Invoice_${invoice.id}.pdf`);
};

export const generatePaymentReportPDF = (invoice, payments) => {
  if (!invoice) return;

  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(18);
  doc.text("PAYMENT REPORT", 20, y);
  y += 12;

  doc.setFontSize(11);
  doc.text(`Invoice #: ${invoice.id}`, 20, y);
  y += 6;
  doc.text(`Patient: ${invoice.patientName}`, 20, y);
  y += 6;
  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, y);
  y += 12;

  doc.setFillColor(220, 220, 220);
  doc.rect(20, y - 5, 170, 7, "F");
  doc.setFontSize(10);
  doc.text("Payment Date", 22, y);
  doc.text("Amount", 140, y);
  y += 10;

  const invoicePayments = payments.filter((p) => p.invoiceId === invoice.id);
  doc.setFontSize(10);
  invoicePayments.forEach((payment) => {
    const paymentDate = new Date(parseInt(payment.id.split("-")[1])).toLocaleDateString();
    doc.text(paymentDate, 22, y);
    doc.text(`Ksh${payment.amount.toFixed(2)}`, 140, y);
    y += 7;
  });

  y += 5;
  doc.setFillColor(240, 240, 240);
  doc.rect(20, y - 5, 170, 7, "F");
  doc.setFontSize(11);
  doc.setFont(undefined, "bold");

  const totalPaid = invoicePayments.reduce((sum, p) => sum + p.amount, 0);
  const balance = invoice.total - totalPaid;

  doc.text("Invoice Total:", 22, y);
  doc.text(`Ksh${invoice.total.toFixed(2)}`, 140, y);
  y += 7;
  doc.text("Total Paid:", 22, y);
  doc.text(`Ksh${totalPaid.toFixed(2)}`, 140, y);
  y += 7;
  doc.setTextColor(balance > 0 ? 255 : 0, balance > 0 ? 0 : 128, 0);
  doc.text("Balance Due:", 22, y);
  doc.text(`Ksh${balance.toFixed(2)}`, 140, y);

  doc.save(`Payment_Report_${invoice.id}.pdf`);
};
