import { Component, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { LoginComponent } from '../../components/login/login.component';
import { AccesoRapidoComponent } from '../../components/acceso.rapido/acceso.rapido.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent,FormsModule,AccesoRapidoComponent,AccesoRapidoComponent,RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  utilsSvc = inject(UtilService)
  aythSvc = inject(AuthService)
  accesoRapido:any
  seleccionar(usuario:any){
    this.accesoRapido = usuario
  }

  email=""
  password =""

  enviar(){
    console.log(this.email)
    console.log(this.password)
    this.aythSvc.RegistrarOtroConEmail(this.email,this.password).then(data=>{
      console.log(data)
    })

  }
}
