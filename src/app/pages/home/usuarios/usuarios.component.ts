import { Component, inject } from '@angular/core';
import { ListadoUsuariosComponent } from '../../../components/listados/listado.usuarios/listado.usuarios.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { UtilService } from '../../../core/services/util.service';
import { TablaPacientesComponent } from '../../../components/tablas/tabla.pacientes/tabla.pacientes.component';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ListadoUsuariosComponent,HeaderComponent,TablaPacientesComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  utilSvc = inject(UtilService)
  authSvc = inject(AuthService)
  pacientes:User[]=[]


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authSvc.getDataPacientes(data=>{
      this.pacientes = data
    })
  }

  seleccionar(item:User){
    this.utilSvc.goto('home/usuarios/historial',item._id)
    console.log(item)
  }
}
