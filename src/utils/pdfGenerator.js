import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);

/**
 * Generates and downloads a professional PDF order invoice.
 * @param {Object} orderData - Order details including products and total
 * @param {Object} customerData - Customer details
 */
export const generateOrderPDF = (orderData, customerData) => {
  const doc = new jsPDF('p', 'pt', 'a4');

  // Helper variables
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 40;
  let currentY = 40;

  // Header Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('BOOM BOOM PYROTECH', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 20;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Sivakasi, Tamil Nadu', pageWidth / 2, currentY, { align: 'center' });

  // Separator Line
  currentY += 15;
  doc.setLineWidth(1);
  doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);

  currentY += 25;

  // Order Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('ORDER DETAILS', marginLeft, currentY);

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  const orderNumber = `BBP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const orderDate = new Date().toLocaleDateString();
  const orderTime = new Date().toLocaleTimeString();

  doc.text(`Order Number: ${orderNumber}`, marginLeft, currentY);
  currentY += 15;
  doc.text(`Date: ${orderDate}`, marginLeft, currentY);
  currentY += 15;
  doc.text(`Time: ${orderTime}`, marginLeft, currentY);

  // Customer Details (Right Aligned)
  let custY = currentY - 45; // Align with Order Details header
  const rightColX = pageWidth / 2 + 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('CUSTOMER DETAILS', rightColX, custY);

  custY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  doc.text(`Name: ${customerData.name}`, rightColX, custY);
  custY += 15;
  doc.text(`Phone: ${customerData.phone}`, rightColX, custY);
  custY += 15;
  if (customerData.alternatePhone) {
    doc.text(`Alt Phone: ${customerData.alternatePhone}`, rightColX, custY);
    custY += 15;
  }
  doc.text(`Address: ${customerData.address}`, rightColX, custY);
  custY += 15;
  doc.text(`District: ${customerData.district}`, rightColX, custY);
  custY += 15;
  doc.text(`State: ${customerData.state} - ${customerData.pincode}`, rightColX, custY);

  // Adjust Y after customer details
  currentY = Math.max(currentY, custY) + 30;

  // Separator Line
  doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  currentY += 20;

  // Product Table
  const tableColumn = ["S.No", "Product Name", "Quantity", "Price", "Amount"];
  const tableRows = [];

  let totalItems = 0;
  
  orderData.items.forEach((item, index) => {
    const itemData = [
      index + 1,
      item.name,
      item.quantity,
      `Rs. ${item.price}`,
      `Rs. ${item.amount}`
    ];
    tableRows.push(itemData);
    totalItems += item.quantity;
  });

  doc.autoTable({
    startY: currentY,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [211, 47, 47], // A shade of red matching secondary-400
      textColor: 255,
      halign: 'center',
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 40 },
      1: { halign: 'left' },
      2: { halign: 'center', cellWidth: 60 },
      3: { halign: 'center', cellWidth: 60 },
      4: { halign: 'center', cellWidth: 80 }
    },
    margin: { left: marginLeft, right: marginLeft }
  });

  // Calculate final Y position after table
  currentY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY + 20 : currentY + 100;

  // Totals Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const totalText = `Total Items: ${totalItems}     Grand Total: Rs. ${orderData.totalAmount}`;
  
  // Right align the total
  doc.text(totalText, pageWidth - marginLeft, currentY, { align: 'right' });

  // Footer
  currentY += 40;
  // If the page is running out of space, add a new page
  if (currentY > doc.internal.pageSize.getHeight() - 50) {
      doc.addPage();
      currentY = 40;
  }
  
  // Separator Line
  doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
  currentY += 20;

  doc.setFontSize(14);
  doc.text('Thank You for Ordering!', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Boom Boom Pyrotech', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 15;
  doc.text('Contact Number: 918122922900', pageWidth / 2, currentY, { align: 'center' });

  // Open PDF in a new tab and trigger the print dialog
  doc.autoPrint();
  const pdfUrl = doc.output('bloburl');
  window.open(pdfUrl, '_blank');
};
