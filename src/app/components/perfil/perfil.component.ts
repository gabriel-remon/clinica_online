import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { User } from '../../core/models/user.model';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  utilSvc = inject(UtilService)
  edicion:boolean=false
  @Input() usuario! :User;
  @Input() editable :boolean=true;
  @Output() activarEdicion = new EventEmitter<void>();
  foto:any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.foto=this.usuario.foto_perfil
  }
  fotoPerfil = true
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


  cambiarFoto(){
    if(this.fotoPerfil){
      this.foto = this.usuario.foto_paciente
      this.fotoPerfil = false
    }else{
      this.foto = this.usuario.foto_perfil
      this.fotoPerfil = true

    }
  }
}
