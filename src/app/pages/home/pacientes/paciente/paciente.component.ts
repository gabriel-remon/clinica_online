import { Component, inject } from '@angular/core';
import { HistoralPacienteComponent } from '../../../../components/historal.paciente/historal.paciente.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { PerfilComponent } from '../../../../components/perfil/perfil.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../../../core/services/util.service';
import { User } from '../../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { ItemObraSocialComponent } from '../../../../components/items/item.obra.social/item.obra.social.component';
import { HistorialComponent } from '../../../../components/tablas/historial/historial.component';
import { Turno } from '../../../../core/models/turno.model';
import { TurnoService } from '../../../../core/services/turno.service';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [PerfilComponent,HistorialComponent,HeaderComponent,CommonModule,ItemObraSocialComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

  router = inject(ActivatedRoute)
  spinerSvc = inject(NgxSpinnerService)
  authSvc = inject(AuthService)
  utilSvc = inject(UtilService)
  toastSvc = inject(ToastrService)
  turnosSvc = inject(TurnoService)
  paciente!:User
  turnos:Turno[]=[]

  ngOnInit() {

    this.router.params.subscribe(params => {
      this.spinerSvc.show()
      this.authSvc.getDataId( params['id'],data=>{
        this.spinerSvc.hide()
        this.paciente= data
        this.turnosSvc.turnoDePaciente(data._id,data=>{

          for(let i =0;i<data.length;i++){
            //@ts-ignore
            data[i].dia= data[i].dia.toDate()
          }
          this.turnos =data
        })
      },()=>this.spinerSvc.hide())
  })}

}
