import { CommonModule, Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-horario-especialista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.especialista.component.html',
  styleUrl: './horario.especialista.component.css'
})
export class HorarioEspecialistaComponent {


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
        hours: 10,
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
        hours: 10,
        minutes: 10
      },
      activo:true
    },
    {
      dia: "miercoles",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 10,
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
        hours: 10,
        minutes: 10
      },
      activo:true
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
        hours: 10,
        minutes: 10
      },
      activo:false
    },
    {
      dia: "sabado",
      hora_inicio:
      {
        hours: 10,
        minutes: 10
      },
      hora_fin:
      {
        hours: 10,
        minutes: 10
      },
      activo:true
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
        hours: 10,
        minutes: 10
      },
      activo:false
    }
  ]

  seleccionar(item:any){
    item.activo = !item.activo
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
