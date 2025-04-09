import { utils, writeFile } from "xlsx";

const exportToExcel = async (
  excelDataArray: {
    workBookColumns: string[];
    data: (string | number)[][];
    workSheetName: string;
  }[],
  fileName: string
) => {
  try {
    const workBook = utils.book_new();

    excelDataArray.forEach(({ workBookColumns, data, workSheetName }) => {
      const sheetData = [workBookColumns, ...(data || [])];
      const workSheet = utils.aoa_to_sheet(sheetData);
      utils.book_append_sheet(workBook, workSheet, workSheetName);
    });

    writeFile(workBook, `${fileName}.xlsx`);
  } catch (error) {
    throw new Error(`Export failed ${error}`);
  }
};

export default exportToExcel;
