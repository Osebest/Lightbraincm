import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Utility functions to export data to CSV and Excel formats, will be using CSV for now
export function exportToCSV(data: any[], filename = "exams.csv") {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}

export function exportToExcel(data: any[], filename = "exams.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Exams");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, filename);
}
