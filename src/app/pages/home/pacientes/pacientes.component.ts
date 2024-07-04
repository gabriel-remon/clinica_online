import { Component, inject } from '@angular/core';
import { TablaPacientesComponent } from '../../../components/tablas/tabla.pacientes/tabla.pacientes.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { UtilService } from '../../../core/services/util.service';
import { User } from '../../../core/models/user.model';
import { Turno } from '../../../core/models/turno.model';
import { AuthService } from '../../../core/services/auth.service';
import { TurnoService } from '../../../core/services/turno.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [TablaPacientesComponent,HeaderComponent],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  utilSvc = inject(UtilService)
  authSvc = inject(AuthService)
  turnosSvc = inject(TurnoService)
  spinerSvc = inject(NgxSpinnerService)
  usuario!:User;
  usuarios:User[]=[]
  turnos:Turno[]=[]


  ngOnInit(): void {
    if(this.authSvc.userLogin){
      console.log(this.authSvc.userLogin)
      this.usuario = this.authSvc.userLogin
      this.turnosSvc.turnoDeEspecialista(this.usuario._id,data=>{

        for(let i =0;i<data.length;i++){
          //@ts-ignore
          data[i].dia= data[i].dia.toDate()
        }
        console.log(data)
          this.usuarios = this.obtenerPacientesUnicos(data)
      })
    }else{
      this.spinerSvc.show()
    }

    this.authSvc.user$.subscribe(data =>{
     
      this.usuario = data
      this.turnosSvc.turnoDeEspecialista(this.usuario._id,data=>{

        for(let i =0;i<data.length;i++){
          //@ts-ignore
          data[i].dia= data[i].dia.toDate()
        }
        const arrayId = this.obtenerPacientesUnicos(data)

        this.authSvc.getData(usuarios=>{
          this.spinerSvc.hide()
          const idsSet = new Set(arrayId.map(obj => obj.id));
  
          this.usuarios = usuarios.filter(item => idsSet.has(item._id));
        })


        console.log(this.obtenerPacientesUnicos(data))
      })
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  obtenerPacientesUnicos(turnos: Turno[]): any[] {
    const pacientes = new Map<string, any>();
    turnos.forEach(turno => {
      pacientes.set(turno.paciente.id, turno.paciente);
    });
    return Array.from(pacientes.values());
  }


  seleccionar(item:any){
    this.utilSvc.goto('home/pacientes/',item.id)
    console.log(item)
  }
}
