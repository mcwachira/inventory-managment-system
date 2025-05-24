import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Invoice } from "./data";

export const generateInvoicePDF = async (invoice: Invoice): Promise<Blob> => {
  // Create a temporary div with invoice content

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.width = "210mm"; // A4 width
  tempDiv.style.backgroundColor = "white";
  tempDiv.style.padding = "20px";
  tempDiv.style.fontFamily = "Arial, sans-serif";

  tempDiv.innerHTML = `

      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <!-- Invoice Header -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div>
              <h1 style="font-size: 32px; font-weight: bold; color: #333; margin-bottom: 5px;">INVOICE</h1>
              <p style="color: #666; margin: 0;">#${invoice.invoiceNumber}</p>
            </div>
            <div style="text-align: right;">
              <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">Goods in Motion</h2>
              <p style="color: #666; margin: 2px 0;">123 Inventory Street</p>
              <p style="color: #666; margin: 2px 0;">Warehouse City, WC 12345</p>
              <p style="color: #666; margin: 2px 0;">contact@goodsinmotion.com</p>
            </div>
          </div>


          <!-- Invoice Info -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div>
              <h3 style="font-weight: bold; margin-bottom: 5px;">Bill To:</h3>
              <p style="color: #333; margin: 2px 0;">${invoice.customerName}</p>
              <p style="color: #666; margin: 2px 0;">${invoice.customerAddress || "123 Client Street"}</p>
              <p style="color: #666; margin: 2px 0;">${invoice.customerCity || "Client City, CC 54321"}</p>
              <p style="color: #666; margin: 2px 0;">${invoice.customerEmail || "client@example.com"}</p>
            </div>
            <div style="text-align: right;">
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 500;">Invoice Date: </span>
                <span>${new Date(invoice.date).toLocaleDateString()}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 500;">Due Date: </span>
                <span>${new Date(invoice.dueDate).toLocaleDateString()}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span style="font-weight: 500;">Status: </span>
                <span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; background-color: ${
                  invoice.status === "paid"
                    ? "#dcfce7; color: #166534"
                    : invoice.status === "pending"
                      ? "#fef3c7; color: #92400e"
                      : invoice.status === "overdue"
                        ? "#fecaca; color: #991b1b"
                        : "#f3f4f6; color: #374151"
                }">
                  ${invoice.status}
                </span>
              </div>
            </div>
          </div>

          <!-- Invoice Items -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
                <thead>
                  <tr style="border-bottom: 2px solid #e5e7eb;">
                    <th style="text-align: left; padding: 12px 0; font-weight: 600;">Item</th>
                    <th style="text-align: left; padding: 12px 0; font-weight: 600;">Description</th>
                    <th style="text-align: right; padding: 12px 0; font-weight: 600;">Qty</th>
                    <th style="text-align: right; padding: 12px 0; font-weight: 600;">Price</th>
                    <th style="text-align: right; padding: 12px 0; font-weight: 600;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    invoice.items
                      ? invoice.items
                          .map(
                            (item) => `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                      <td style="padding: 12px 0;">${item.name}</td>
                      <td style="padding: 12px 0;">${item.description}</td>
                      <td style="text-align: right; padding: 12px 0;">${item.quantity}</td>
                      <td style="text-align: right; padding: 12px 0;">$${item.price.toFixed(2)}</td>
                      <td style="text-align: right; padding: 12px 0;">$${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  `,
                          )
                          .join("")
                      : ""
                  }
                </tbody>
              </table>

              <!-- Invoice Summary -->
                  <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
                    <div style="width: 250px;">
                      <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                        <span>Subtotal:</span>
                        <span>$${(invoice.amount - invoice.tax + invoice.discount).toFixed(2)}</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                        <span>Tax:</span>
                        <span>$${invoice.tax.toFixed(2)}</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                        <span>Discount:</span>
                        <span>-$${invoice.discount.toFixed(2)}</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; padding: 12px 0; font-weight: bold; border-top: 2px solid #e5e7eb;">
                        <span>Total:</span>
                        <span>$${invoice.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Notes -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    <h4 style="font-weight: 500; margin-bottom: 10px;">Notes</h4>
                    <p style="color: #666; margin: 0;">${invoice.notes || "Thank you for your business!"}</p>
                  </div>
                </div>
              `;

  document.body.appendChild(tempDiv);

  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; //A4 width in mm
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf.output("blob");
  } finally {
    document.body.removeChild(tempDiv);
  }
};

export const downloadInvoicePDF = async (invoice: Invoice) => {
  try {
    const pdfBlob = await generateInvoicePDF(invoice);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
};
