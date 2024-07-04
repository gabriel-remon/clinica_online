import { Component, inject } from '@angular/core';
import { ItemObraSocialComponent } from '../../../../components/items/item.obra.social/item.obra.social.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../components/header/header.component';
import { PerfilComponent } from '../../../../components/perfil/perfil.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../core/services/auth.service';
import { UtilService } from '../../../../core/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { TurnoService } from '../../../../core/services/turno.service';
import { User } from '../../../../core/models/user.model';
import { Turno } from '../../../../core/models/turno.model';
import { HistorialComponent } from '../../../../components/tablas/historial/historial.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [PerfilComponent,HistorialComponent,HeaderComponent,CommonModule,ItemObraSocialComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialUseresComponent {
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
