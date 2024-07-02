import { Component, inject } from '@angular/core';
import { TablaEspecialistaComponent } from '../../../../components/tablas/tabla.especialista/tabla.especialista.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspecialistaService } from '../../../../core/services/especialista.service';
import { Horarios, User } from '../../../../core/models/user.model';
import { Turno } from '../../../../core/models/turno.model';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [TablaEspecialistaComponent, HeaderComponent],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent {


  router = inject(ActivatedRoute)
  spinerSvc = inject(NgxSpinnerService)
  especialistaSvc = inject(EspecialistaService)
  especialistas: any =[]

  ngOnInit() {
    this.router.params.subscribe(params => {
      // console.log(params)
      this.spinerSvc.show()
      this.especialistaSvc.getData(data => {
        const listaEspecialistas:any =[]
        data.forEach(elemnt => {
          if(elemnt.especialidades){
            const especialidadExiste = elemnt.especialidades.some(especialidad => especialidad.id == params['id']);
            if(especialidadExiste && elemnt.especialista_valido){
              listaEspecialistas.push(elemnt)
            }
          }
        })
        this.especialistas =listaEspecialistas
      }, () => this.spinerSvc.hide())

    })
  }

  tomarTurno(especialista:User){

  }
/*
  generarTurnosDisponibles(horarios: Horarios[], turnosReservados: Turno[]): { [dia: string]: string[] } {
    const turnosDisponibles: { [dia: string]: string[] } = {};
  
    horarios.forEach(horario => {
      if (horario.activo) {
        const turnosDelDia: string[] = [];
        let horaActual = horario.hora_inicio;
  
        while (horaActual < horario.fin) {
          const siguienteHora = this.sumarMinutos(horaActual, 30);
          if (siguienteHora <= horario.fin && !this.estaReservado(horario.dia, horaActual, turnosReservados)) {
            turnosDelDia.push(horaActual);
          }
          horaActual = siguienteHora;
        }
  
        turnosDisponibles[horario.dia] = turnosDelDia;
      }
    });
  
    return turnosDisponibles;
  }
  
   sumarMinutos(hora: string, minutos: number): string {
    const [hh, mm] = hora.split(':').map(Number);
    const date = new Date();
    date.setHours(hh, mm + minutos);
  
    const nuevaHora = date.getHours().toString().padStart(2, '0');
    const nuevosMinutos = date.getMinutes().toString().padStart(2, '0');
    
    return ${nuevaHora}:${nuevosMinutos};
  }
  
  estaReservado(dia: string, hora: string, turnosReservados: TurnoReservado[]): boolean {
    return turnosReservados.some(turno => turno.dia === dia && turno.horaInicio === hora);
  }
  
  const turnosDisponibles = this.generarTurnosDisponibles(horarios, turnosReservados);
  console.log(turnosDisponibles);*/
}
