import { Component, Input } from '@angular/core';
import { Turno } from '../../../core/models/turno.model';
import { CommonModule } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-tabla-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'] // corregido de styleUrl a styleUrls
})
export class HistorialComponent {

  @Input() turnos: Turno[] = [];
  objetoPDF: any;

  constructor() {
    // Cargar las fuentes Roboto manualmente
    
   
  }

  formatDate(dia: any): string {
    const date = new Date(dia)
    const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
    const month = date.toLocaleString('es-ES', { month: 'long' }); // Obtiene el nombre del mes en español
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  descargarPDF(turno: Turno) {
    
    this.generarPdf(turno).then(data=>data.download("historial-medico-"+turno.id+".pdf"))
  }
  verPDF(item:Turno){
    this.generarPdf(item).then(data=>data.open())
  }


  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
    });
  }

  async generarPdf(turno:Turno){
    const logo = await this.getBase64ImageFromURL('assets/logo.png')
    const docDefinition :any= {
      
      content: [
        {
          columns: [
            {
              image:logo,
              width: 150,
            },
            [
              {
                text: 'Historal medico',
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Id turno',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: turno.id,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Fecha',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: this.formatDate(turno.dia),
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Paciente:',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'right',
                        width: '*',
                      },
                      {
                        text: turno.paciente.nombre+" "+turno.paciente.apellido,
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        color: '#333333',
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'Detalles del turno',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Profesional',
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: turno.especialista.nombre+" "+turno.especialista.apellido,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        
        {
          columns: [
            {
              text: 'Especialidad',
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: turno.especialidad.nombre,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Comentario',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            }
          ],
        },
        {
          columns: [
            {
              text: turno.comentario,
              style: 'invoiceBillingAddress',
            }
          ],
        },
        {
          columns: [
            {
              text: "calidad de atencion: "+turno.atencion+" puntos",
              style: 'invoiceBillingAddress',
            }
          ],
        },
        '\n\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'Detalles medicos',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 15,
        },
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i:any, node:any) {
              return 1;
            },
            vLineWidth: function(i:any, node:any) {
              return 1;
            },
            hLineColor: function(i:any, node:any) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function(i:any, node:any) {
              return '#eaeaea';
            },
            hLineStyle: function(i:any, node:any) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i:any, node:any) {
              return 10;
            },
            paddingRight: function(i:any, node:any) {
              return 10;
            },
            paddingTop: function(i:any, node:any) {
              return 2;
            },
            paddingBottom: function(i:any, node:any) {
              return 2;
            },
            fillColor: function(rowIndex:any, node:any, columnIndex:any) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 80],
            body: [
              [
                {
                  text: 'DESCRIPCION',
                  fillColor: '#eaf2f5',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'VALOR',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
              ],
              [
                {
                  text: "Altura",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: turno.historia_clinica?.altura+" cm",
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Peso',
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  text: turno.historia_clinica?.peso+" Kg",
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Presion',
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  text: turno.historia_clinica?.presion+" puntos",
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Temperatura',
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  text: turno.historia_clinica?.temperatura+"°C",
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: turno.historia_clinica?.datos_dinamicos!=null && turno.historia_clinica?.datos_dinamicos[0]!=null ?turno.historia_clinica?.datos_dinamicos[0].clave:"",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  text: turno.historia_clinica?.datos_dinamicos!=null && turno.historia_clinica?.datos_dinamicos[0]!=null ?turno.historia_clinica?.datos_dinamicos[0].valor:"",
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: turno.historia_clinica?.datos_dinamicos!=null && turno.historia_clinica?.datos_dinamicos[1]!=null ?turno.historia_clinica?.datos_dinamicos[1].clave:"",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  text: turno.historia_clinica?.datos_dinamicos!=null && turno.historia_clinica?.datos_dinamicos[1]!=null ?turno.historia_clinica?.datos_dinamicos[1].valor:"",
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: turno.historia_clinica?.datos_dinamicos!=null && turno.historia_clinica?.datos_dinamicos[2]!=null ?turno.historia_clinica?.datos_dinamicos[2].clave:"",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  text: turno.historia_clinica?.datos_dinamicos!=null && turno.historia_clinica?.datos_dinamicos[2]!=null ?turno.historia_clinica?.datos_dinamicos[2].valor:"",
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
        };
    
        return pdfMake.createPdf(docDefinition)
    
  }
}
