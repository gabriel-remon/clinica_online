import { Component, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { LoginComponent } from '../../components/login/login.component';
import { AccesoRapidoComponent } from '../../components/acceso.rapido/acceso.rapido.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent,AccesoRapidoComponent,AccesoRapidoComponent,RouterModule],
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
