import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CarruselEspecialidadesComponent } from '../../components/carrusel.especialidades/carrusel.especialidades.component';
import { PerfilMinComponent } from '../../components/perfil.min/perfil.min.component';
import { UtilService } from '../../core/services/util.service';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,
    PerfilMinComponent,
    CarruselEspecialidadesComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  utilsSvc =inject(UtilService)
  authSvc = inject(AuthService)
  spinnerSvc = inject(NgxSpinnerService)
  usuarioLogin!:User

  ngOnInit(): void {
    if(this.authSvc.userLogin){
      this.usuarioLogin = this.authSvc.userLogin
    }else{
      this.spinnerSvc.show()
    }

    this.authSvc.user$.subscribe(data=>{
      this.spinnerSvc.hide()
      this.usuarioLogin=data
    })
  }
}
