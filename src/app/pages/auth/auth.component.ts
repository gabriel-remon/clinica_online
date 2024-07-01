import { Component, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { LoginComponent } from '../../components/login/login.component';
import { AccesoRapidoComponent } from '../../components/acceso.rapido/acceso.rapido.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent,AccesoRapidoComponent,AccesoRapidoComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  utilsSvc = inject(UtilService)

  accesoRapido:any
  seleccionar(usuario:any){
    this.accesoRapido = usuario
  }
}
