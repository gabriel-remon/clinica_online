import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { User } from '../../core/models/user.model';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  utilSvc = inject(UtilService)
  edicion:boolean=false
  @Input() usuario! :User;
  @Output() activarEdicion = new EventEmitter<void>();


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
  editar(){
    this.edicion = !this.edicion
    this.activarEdicion.emit()
  }
}
