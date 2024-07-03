import { CommonModule, Time } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-horario-especialista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.especialista.component.html',
  styleUrl: './horario.especialista.component.css'
})
export class HorarioEspecialistaComponent {

  
  @Output() especialidadesActuales = new EventEmitter<any>();

  @Input() usuario!:User;
  @Input() editable:boolean = false;

  horarios: any = [
    {
      dia: "lunes",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 15,
        minutes: 10
      },
      activo:true
    },
    {
      dia: "martes",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 13,
        minutes: 10
      },
      activo:true
    },
    {
      dia: "miércoles",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 15,
        minutes: 10
      },
      activo:true
    },
    {
      dia: "jueves",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 16,
        minutes: 10
      },
      activo:false
    },
    {
      dia: "viernes",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 15,
        minutes: 10
      },
      activo:true
    },
    {
      dia: "sábado",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 16,
        minutes: 10
      },
      activo:false
    },
    {
      dia: "domingo",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 15,
        minutes: 10
      },
      activo:false
    }
  ]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.usuario)
    if(!this.usuario.horario){
      this.usuario.horario= this.horarios
    }
  }

  seleccionar(item:any){
    console.log(this.editable)
    if(this.editable){
      item.activo = !item.activo
      this.especialidadesActuales.emit()
    }
  }
  convertirHora(hora: { hours: number; minutes: number }): string {
    const horas = this.padZero(hora.hours);
    const minutos = this.padZero(hora.minutes);
    return `${horas}:${minutos}`;
  }
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
