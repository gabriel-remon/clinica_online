import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { TurnoService } from '../../../core/services/turno.service';
@Component({
  selector: 'app-tabla-especialista',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './tabla.especialista.component.html',
  styleUrl: './tabla.especialista.component.css'
})
export class TablaEspecialistaComponent {

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
