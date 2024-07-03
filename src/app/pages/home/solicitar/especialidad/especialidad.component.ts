import { Component, inject } from '@angular/core';
import { TablaEspecialistaComponent } from '../../../../components/tablas/tabla.especialista/tabla.especialista.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspecialistaService } from '../../../../core/services/especialista.service';
import { Horarios, User } from '../../../../core/models/user.model';
import { Turno } from '../../../../core/models/turno.model';
import { CommonModule } from '@angular/common';
import { TablaHorariosComponent } from '../../../../components/tablas/tabla.horarios/tabla.horarios.component';
import { Especialidad } from '../../../../core/models/especialidades.model';
import { AuthService } from '../../../../core/services/auth.service';
import { EspecialidadService } from '../../../../core/services/especialidad.service';
import { HoraTurnoComponent } from '../../../../components/modals/hora-turno/hora-turno.component';
import { MatDialog } from '@angular/material/dialog';
import { TurnoService } from '../../../../core/services/turno.service';
import { UtilService } from '../../../../core/services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [TablaEspecialistaComponent, HeaderComponent, CommonModule, TablaHorariosComponent],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent {


  router = inject(ActivatedRoute)
  spinerSvc = inject(NgxSpinnerService)
  especialistaSvc = inject(EspecialistaService)
  especialidadSvc=inject(EspecialidadService)
  authSvc = inject(AuthService)
  especialistas: any = []
  especialista !: User
  especialidad!:Especialidad
  userLogin!:User
  dialog = inject(MatDialog)
  turnosSvc = inject(TurnoService)
  utilSvc = inject(UtilService)
  toastSvc = inject(ToastrService)

  ngOnInit() {

    if(this.authSvc.userLogin){
      this.userLogin = this.authSvc.userLogin
    }else{
      this.authSvc.user$.subscribe(data =>this.userLogin = data)
    }

    

    this.router.params.subscribe(params => {
      this.especialidadSvc.getEspecialidadId( params['id'],(data)=>this.especialidad=data)

      this.spinerSvc.show()
      this.especialistaSvc.getData(data => {
        const listaEspecialistas: any = []
        data.forEach(elemnt => {
          if (elemnt.especialidades) {
            const especialidadExiste = elemnt.especialidades.some(especialidad => especialidad.id == params['id']);
            if (especialidadExiste && elemnt.especialista_valido) {
              listaEspecialistas.push(elemnt)
            }
          }
        })
        this.especialistas = listaEspecialistas
      }, () => this.spinerSvc.hide())

    })

  }

  dias: any[] = []


  SeleccionarEspecialista(especialista: User) {
    const dias = this.setDias(especialista)
    const diasDisponibles = []
    this.especialista = especialista
    
    if (especialista.horario) {
      dias.forEach(element => {
        especialista.horario?.forEach(dia=>{
          if(dia.dia == element.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase() && dia.activo){
            this.dias.push(element)
          }
        })
      });
    }
    //console.log(this.dias)
  }

  tomarTurno(horario: any) {
    if (this.especialista.horario) {
      const turnosDisponibles = this.generarTurnosDisponibles(new Date(horario), this.especialista.horario)
     
      //modal para pedir turno 


      const dialogRef = this.dialog.open(HoraTurnoComponent, {
        
        data: turnosDisponibles
      });
  
      let horarioSelect:any
      dialogRef.afterClosed().subscribe(result => 
        {
          if(result == undefined){
            this.toastSvc.error("no selecciono ningun horario")
            return
          }
          horarioSelect= result 
          if(this.userLogin.rol == "paciente"){
            const turno={
              dia:horario,
              especialidad:{
                id:this.especialidad.id,
                nombre:this.especialidad.nombre,
                src_foto:this.especialidad.src_foto
              },
              especialista:{
                id:this.especialista._id,
                nombre:this.especialista.nombre,
                apellido:this.especialista.apellido,
                foto:this.especialista.foto_perfil
              },
              estado:"pendiente",
              hora_inicio:turnosDisponibles[0].hora_inicio,
              hora_fin:turnosDisponibles[0].hora_fin,
              id:"",
              paciente:{
                id:this.userLogin._id,
                nombre:this.userLogin.nombre,
                apellido:this.userLogin.apellido,
                foto: this.userLogin.foto_perfil
              }
            }
            this.spinerSvc.show()

            this.turnosSvc.newData(turno as Turno).then(res=>{
              this.toastSvc.success(res.mensaje)
              this.utilSvc.goto('home')
              //this.spinerSvc.show()
              console.log(res)
            }).catch(err=>{
              
             this.toastSvc.error(err.mensaje)
             //console.log(err)
            }).finally(()=>this.spinerSvc.hide())
          }
        });
        
    
      


     
    }

  }


  setDias(especialista: User) {/*
    if(especialista.horario){
      const turnosTotales = this.getTurnosTotales()
      const turnosDisponibles = this.turnosDisponibles(turnosTotales,[],especialista.horario)
      const diasDisponibles = this.getDiasDisponibles(turnosDisponibles)
      console.log(diasDisponibles)
    }*/
    const diasMap: Record<string, number> = {
      "lunes": 1,
      "martes": 2,
      "miércoles": 3,
      "jueves": 4,
      "viernes": 5,
      "sábado": 6,
      "domingo": 7
    };

    // Mapeamos los días laborables del especialista a números según el mapa `diasMap`
    const diasLaborables = especialista.horario?.map(a => diasMap[a.dia.toLowerCase()]) ?? [];

    // Obtenemos la fecha actual
    const fechaActual = new Date();
    const dias: Date[] = [];

    // Iteramos para obtener las siguientes 15 fechas laborables
    let i = 0;
    while (dias.length < 15) {
      const nuevaFecha = new Date();
      nuevaFecha.setDate(fechaActual.getDate() + i);

      // `getDay()` devuelve un número entre 0 (domingo) y 6 (sábado)
      const diaSemana = nuevaFecha.getDay(); // Aquí se ajusta el día de la semana para que coincida con `diasMap`

      // Comparamos solo si el día es laborable según el mapa `diasMap`
      if (diasLaborables.includes(diaSemana === 0 ? 7 : diaSemana)) {
        dias.push(nuevaFecha);
      }
      i++;
    }
    return dias

  }


  generarTurnosDisponibles(fecha: Date, horario: Horarios[]): any[] {
    const turnos: any[] = [];
    const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
    const horarioSlect = horario.find(horario => horario.dia.toLowerCase() === diaSemana.toLowerCase());
    console.log(diaSemana)
    console.log(horarioSlect)
    if (!horarioSlect || !horarioSlect.activo) {
      return turnos;
    }

    /*if (horario.dia.toLowerCase() !== diaSemana) {
      return turnos;
    }*/

    let horaActual = { ...horarioSlect.hora_inicio };
    const horaFin = horarioSlect.hora_fin;
    //console.log(horario.dia.toLowerCase())

    while (
      horaActual.hours < horaFin.hours ||
      (horaActual.hours === horaFin.hours && horaActual.minutes < horaFin.minutes)
    ) {
      const horaInicio = { ...horaActual };
      const horaFinTurno = { hours: horaActual.hours, minutes: horaActual.minutes + 30 };

      if (horaFinTurno.minutes >= 60) {
        horaFinTurno.hours += 1;
        horaFinTurno.minutes -= 60;
      }

      if (
        horaFinTurno.hours < horaFin.hours ||
        (horaFinTurno.hours === horaFin.hours && horaFinTurno.minutes <= horaFin.minutes)
      ) {
        turnos.push({
          dia: diaSemana,
          hora_inicio: horaInicio,
          hora_fin: horaFinTurno,
        });
      }

      horaActual = { ...horaFinTurno };
    }

    return turnos;
  }
  /*
    getTurnosTotales(): any[] {
      const turnos: any[] = [];
      const now = new Date();
      const end = new Date();
      end.setDate(now.getDate() + 15);
    
      for (let date = new Date(now); date <= end; date.setDate(date.getDate() + 1)) {
        for (let hours = 0; hours < 24; hours++) {
          for (let minutes = 0; minutes < 60; minutes += 30) {
            const turno:any={
              dia: new Date(date),
              hora_inicio:  { hours, minutes },
              hora_fin: { hours, minutes: minutes + 30 }
            } 
            turnos.push(turno);
          }
        }
      }
    
      return turnos;
  
    }
    
    turnosDisponibles(turnosTotales: any[], turnosAsignados: Turno[], horarioEspecialista: Horarios[]): Turno[] {
      return turnosTotales.filter(turnoTotal => {
        const day = turnoTotal.dia.toLocaleString('es-ES', { weekday: 'long' }).toLowerCase();
        const horario = horarioEspecialista.find(h => h.dia === day && h.activo);
    
        if (!horario) {
          return false;
        }
    
        const turnoTotalInicio = turnoTotal.hora_inicio.hours * 60 + turnoTotal.hora_inicio.minutes;
        const turnoTotalFin = turnoTotal.hora_fin.hours * 60 + turnoTotal.hora_fin.minutes;
        const horarioInicio = horario.hora_inicio.hours * 60 + horario.hora_inicio.minutes;
        const horarioFin = horario.hora_fin.hours * 60 + horario.hora_fin.minutes;
    
        if (turnoTotalInicio < horarioInicio || turnoTotalFin > horarioFin) {
          return false;
        }
    
        return !turnosAsignados.some(turnoAsignado => {
          const turnoAsignadoInicio = turnoAsignado.hora_inicio.hours * 60 + turnoAsignado.hora_inicio.minutes;
          const turnoAsignadoFin = turnoAsignado.hora_fin.hours * 60 + turnoAsignado.hora_fin.minutes;
          return turnoTotal.dia.toDateString() === turnoAsignado.dia.toDateString() &&
            turnoTotalInicio < turnoAsignadoFin && turnoTotalFin > turnoAsignadoInicio;
        });
      });
    }
    getDiasDisponibles(turnosDisponibles: Turno[]): any[] {
      const diasUnicos: Map<string, any> = new Map();
    
      turnosDisponibles.forEach(turno => {
        const dia = turno.dia.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
        const fechaString = turno.dia.toDateString();
    
        if (!diasUnicos.has(fechaString)) {
          diasUnicos.set(fechaString, { fecha: turno.dia, nombreDia: dia });
        }
      });
    
      return Array.from(diasUnicos.values());
    }*/
}
