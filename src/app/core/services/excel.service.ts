import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

 
  exportAsExcelFile(data: any[], fileName: string): void {
    // Crear una hoja de trabajo (worksheet) a partir de los datos
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Crear un libro de trabajo (workbook)
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    // Generar un buffer binario
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Llamar a la función para guardar el archivo
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const fecha =new Date
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    saveAs(data, `${fileName}_${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}${this.EXCEL_EXTENSION}`);
  }


// Constantes para el tipo de archivo y la extensión
EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
EXCEL_EXTENSION = '.xlsx';
}
