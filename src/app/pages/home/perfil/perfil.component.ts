import { Component, Input, inject } from '@angular/core';
import { ListadoEspecialidadesComponent } from '../../../components/listados/listado.especialidades/listado.especialidades.component';
import { TablaEspecialidadesComponent } from '../../../components/tablas/tabla.especialidades/tabla.especialidades.component';
import { HorarioEspecialistaComponent } from '../../../components/horario.especialista/horario.especialista.component';
import { HistoralPacienteComponent } from '../../../components/historal.paciente/historal.paciente.component';
import { TablaObraSocialComponent } from '../../../components/tablas/tabla.obra.social/tabla.obra.social.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { PerfilComponent } from '../../../components/perfil/perfil.component';
import { ItemObraSocialComponent } from '../../../components/items/item.obra.social/item.obra.social.component';
import { ObraSocial } from '../../../core/models/obra.social.model';
import { Especialidad } from '../../../core/models/especialidades.model';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'page-perfil',
  standalone: true,
  imports: [PerfilComponent,ListadoEspecialidadesComponent,TablaEspecialidadesComponent,
    HorarioEspecialistaComponent,HistoralPacienteComponent,TablaObraSocialComponent,
    HeaderComponent,ItemObraSocialComponent,CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilPage {
  obraSocial:ObraSocial|null = null;
  especialidades : Especialidad[]|null=null
  authSvc = inject(AuthService)
  spinnerSvc = inject(NgxSpinnerService)
  user!:User;
  edicion:boolean = false

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.authSvc.userLogin){
      this.user = this.authSvc.userLogin
    }  else{

      this.spinnerSvc.show()
    }
    this.authSvc.user$.subscribe(data=>{
      this.spinnerSvc.hide()
      this.user = data
      console.log(data)
    })
  }
}
