import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-horarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.horarios.component.html',
  styleUrl: './tabla.horarios.component.css'
})
export class TablaHorariosComponent {

  @Input() horarios:any[]=[]

  @Output() horarioSelect = new EventEmitter<any>();


   obtenerDia(fecha:any): string {
    const opcionesDia = { weekday: 'long' };
    const nombreDia = fecha.toLocaleDateString('es-ES', opcionesDia);
    const numeroDia = fecha.getDate();
    return `${numeroDia} ${nombreDia}`;
  }

  seleccionar(horario:any){
    this.horarioSelect.emit(horario)

  }
}
