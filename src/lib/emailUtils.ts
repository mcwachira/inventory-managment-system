import { Invoice } from "./data";
import { generateInvoicePDF } from "./pdfUtils";

export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  attachPDF?: boolean;
}

export const sendInvoiceEmail = async (
  invoice: Invoice,
  options: EmailOptions,
) => {
  try {
    let pdfBlob: Blob | null = null;

    if (options.attachPDF) {
      pdfBlob = await generateInvoicePDF(invoice);
    }

    //create a mailto linbk for now
    //integrate with sendGrid /other service in future

    const subject = encodeURIComponent(options.subject);
    const body = encodeURIComponent(options.body);
    const mailtoLink = `mailto:${options.to}?subject=${subject}&body=${body}`;

    // Open the default email client
    window.open(mailtoLink);

    //downlaod pdf for manual attachment

    if (options.attachPDF && pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    return { success: true, message: "Email prepared successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to prepare email" };
  }
};
export const generateEmailTemplate = (invoice: Invoice): string => {
  return `Dear ${invoice.customerName},

Please find attached invoice #${invoice.invoiceNumber} for your recent order.

Invoice Details:
- Invoice Number: ${invoice.invoiceNumber}
- Date: ${new Date(invoice.date).toLocaleDateString()}
- Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
- Total Amount: $${invoice.amount.toFixed(2)}

Payment is due by ${new Date(invoice.dueDate).toLocaleDateString()}. Please contact us if you have any questions regarding this invoice.

Thank you for your business!

Best regards,
Goods in Motion Team
contact@goodsinmotion.com`;
};
