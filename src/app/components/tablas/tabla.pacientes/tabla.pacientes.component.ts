import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TurnoService } from '../../../core/services/turno.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-pacientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.pacientes.component.html',
  styleUrl: './tabla.pacientes.component.css'
})
export class TablaPacientesComponent {
  @Input() especialistas:User[]=[]

  @Output() especialidadSelect = new EventEmitter<User>();


  turnosSvc =inject(TurnoService)


  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
  
    return edad;
  }

  seleccionar(especialista:User){
    this.especialidadSelect.emit(especialista)
  }
}
