import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-acceso-rapido',
  standalone: true,
  imports: [],
  templateUrl: './acceso.rapido.component.html',
  styleUrl: './acceso.rapido.component.css'
})
export class AccesoRapidoComponent {

  @Output() seleccionarUsuario = new EventEmitter<{email:string,password:string}>();

  seleccionar(email:string,password:string){
    this.seleccionarUsuario.emit({email:email,password:password})
  }

}
