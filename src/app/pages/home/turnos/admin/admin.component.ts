import { Component, inject } from '@angular/core';
import { TablaTurnosComponent } from '../../../../components/tablas/tabla.turnos/tabla.turnos.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { Turno } from '../../../../core/models/turno.model';
import { TurnoService } from '../../../../core/services/turno.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../../core/models/user.model';
import { Especialidad } from '../../../../core/models/especialidades.model';
import { FiltroComponent } from '../../../../components/modals/filtro/filtro.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TablaTurnosComponent,HeaderComponent,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  turnosLocal:Turno[] =[]
  turnos:Turno[] =[]
  turnosSvc = inject(TurnoService)
  authSvc = inject(AuthService)
  spinerSvc = inject(NgxSpinnerService)
  usuario!:User
  dialog=inject(MatDialog)
  listaEspecialistas :any[]=[]
  listaEspecialidades:any[]=[]

  ngOnInit(): void {
    if(this.authSvc.userLogin){
      this.usuario = this.authSvc.userLogin
      this.turnosSvc.getData(data=>{

        for(let i =0;i<data.length;i++){
          //@ts-ignore
          data[i].dia= data[i].dia.toDate()
        }
          this.turnos =data
          this.turnosLocal = data
          this.listaEspecialistas =this.obtenerEspecialistasUnicos(data)
          this.listaEspecialidades = this.obtenerEspecialidadesUnicas(data)
      })
    }else{
      this.spinerSvc.show()
    }
    this.authSvc.user$.subscribe(data =>{
      this.spinerSvc.hide()
      this.usuario = data
      this.turnosSvc.getData(data=>{

        for(let i =0;i<data.length;i++){
          //@ts-ignore
          data[i].dia= data[i].dia.toDate()
        }
          this.turnos =data
          this.turnosLocal=data
          this.listaEspecialistas =this.obtenerEspecialistasUnicos(data)
          this.listaEspecialidades = this.obtenerEspecialidadesUnicas(data)
      })
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }


  filtrarEspecialista(){
    const dialogRef = this.dialog.open(FiltroComponent,{
      data: this.listaEspecialistas
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.turnos = this.turnosLocal.filter(turno => turno.especialista.id === result.id);
      }
    });
    
  }
  
  filtrarEspecialidad(){
    console.log(this.listaEspecialidades)
    const dialogRef = this.dialog.open(FiltroComponent,{
      data: this.listaEspecialidades
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.turnos = this.turnosLocal.filter(turno => turno.especialidad.id === result.id);
      }
    });
  }

  obtenerEspecialistasUnicos(turnos: Turno[]): any[] {
    const especialistas = new Map<string, any>();
    turnos.forEach(turno => {
      especialistas.set(turno.especialista.id, turno.especialista);
    });
    return Array.from(especialistas.values());
  }

  obtenerEspecialidadesUnicas(turnos: Turno[]): any[] {
    const especialidades = new Map<string, any>();
    turnos.forEach(turno => {
      especialidades.set(turno.especialidad.id, turno.especialidad);
    });
    return Array.from(especialidades.values());
  }

}
