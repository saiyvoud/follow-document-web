export const ExportToXLSX = async (data, fileNane) => {
    const XLSX = require('xlsx');
    const worksheet = XLSX.utils.json_to_sheet(data);
    const style = {
        font: { name: 'Arial', sz: 14, bold: true, color: { rgb: 'FF0000' } }
      };
      
      // Apply the style to a cell (e.g., A1)
    worksheet['A1'].s = style;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet");
    XLSX.writeFile(workbook, fileNane + ".xlsx", { compression: true });
}