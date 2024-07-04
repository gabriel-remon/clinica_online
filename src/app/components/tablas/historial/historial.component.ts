import { Component, Input } from '@angular/core';
import { Turno } from '../../../core/models/turno.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  @Input() turnos:Turno[]=[]

}
