import { NgxSpinnerService } from 'ngx-spinner';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './listado.usuarios.component.html',
  styleUrl: './listado.usuarios.component.css'
})
export class ListadoUsuariosComponent {

  authSvc = inject(AuthService)
  usuarios:any=[]
  spinnerSvc = inject(NgxSpinnerService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.spinnerSvc.show()
    this.authSvc.getData(data=>{
      this.spinnerSvc.hide()
      let result = []
      for(let i=0; i<data.length;i+=10){
        result.push(data.slice(i,i+10))
      }
      console.log(result )
     this.usuarios = result

    
    })
  }

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
  
  cambiarEstado(especialista:User){
    especialista.especialista_valido = !especialista.especialista_valido
    this.authSvc.updateData(especialista)
  }


}
