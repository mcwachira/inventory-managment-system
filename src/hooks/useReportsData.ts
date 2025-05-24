import { useState, useEffect } from "react";

interface UseReportsDataProps {
  dateFrom?: Date;
  dateTo?: Date;
  warehouse: string;
  status: string;
  reportType: string;
}

export const useReportsData = ({
  dateFrom,
  dateTo,
  warehouse,
  status,
  reportType,
}: UseReportsDataProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setData([]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dateFrom, dateTo, warehouse, status, reportType]);

  const exportToCsv = () => {
    const csvData = generateCsvData();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${reportType}_report_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPdf = () => {
    // In a real application, you would use a library like jsPDF or html2pdf
    console.log("Exporting to PDF...");
    alert(
      "PDF export functionality would be implemented here using libraries like jsPDF or html2pdf",
    );
  };

  const generateCsvData = () => {
    let headers = "";
    let rows = "";

    switch (reportType) {
      case "inventory":
        headers = "Product Name,Category,Quantity,Value,Status\n";
        rows = [
          'Laptop Pro 15",Electronics,45,$1250.00,In Stock',
          "Wireless Mouse,Electronics,120,$29.99,In Stock",
          "Office Chair,Furniture,8,$199.99,Low Stock",
          "Desk Lamp,Lighting,0,$45.00,Out of Stock",
          "Notebook Set,Stationery,200,$12.99,In Stock",
        ].join("\n");
        break;
      case "sales":
        headers = "Date,Customer,Amount,Items,Status\n";
        rows = [
          "2024-01-15,John Smith,$1250.00,3,Completed",
          "2024-01-14,Sarah Wilson,$89.99,2,Completed",
          "2024-01-13,Mike Johnson,$455.50,5,Pending",
          "2024-01-12,Lisa Brown,$199.99,1,Completed",
          "2024-01-11,David Lee,$75.00,3,Refunded",
        ].join("\n");
        break;
      default:
        headers = "No Data\n";
        rows = "";
    }

    return headers + rows;
  };

  return {
    data,
    isLoading,
    exportToCsv,
    exportToPdf,
  };
};
