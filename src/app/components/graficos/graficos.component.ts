import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { TurnoService } from '../../core/services/turno.service';
import { AuthService } from '../../core/services/auth.service';
import { ExcelService } from '../../core/services/excel.service';
import { Turno } from '../../core/models/turno.model';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css',
  providers: [
    provideEcharts(),
  ]
})
export class GraficosComponent {

  turnosSvc = inject(TurnoService)
  authSvc = inject(AuthService)
  excelSvc = inject(ExcelService)

  turnos: any[] = []
  ingresos: any[] = []

  informeIngresos: any;
  informeTurnosPorEspecialidad: any;
  informeTurnosPorEspecialista: any;
  informeTurnosPorDia: any;
  informeTurnosFinalizados: any

  graficoIngresos: any;
  graficoTurnosPorEspecialidad: any;
  graficoTurnosPorEspecialista: any;
  graficoTurnosPorDia: any;
  graficoTurnosFinalizados: any







  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.turnosSvc.getData(data => {
      this.turnos = data
      this.generarInformeEspecialidades()
      this.generarInformeTurnos()
      this.generarInformeTurnosPorDia()
      this.generarInformeTurnosRealizados()
    })
    this.authSvc.getDataIngresos(data => {
      this.ingresos = data
      this.generarInfomeIngresos()
    })

  }

  seleccionar(item: any) {
  }


  descargarExcel(data: any, titulo: string) {
    this.excelSvc.exportAsExcelFile(data, titulo)
  }


  generarInfomeIngresos() {

    //@ts-ignore
    const ingresos = this.ingresos.map(usuario => {
      const millisecondsFromSeconds = usuario.horaIngreso.seconds * 1000;

      // Convertir nanosegundos a milisegundos
      const millisecondsFromNanoseconds = usuario.horaIngreso.nanoseconds / 1000000;

      // Crear la fecha sumando los milisegundos
      const date = new Date(millisecondsFromSeconds + millisecondsFromNanoseconds);
      // Formatear la fecha en un formato legible
      return ({
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        ingreso: date.toString(),
        rol: usuario.categoria,
      })
    })
    this.informeIngresos = ingresos

    const userMap = new Map();

    ingresos.forEach(entry => {
      if (!userMap.has(entry.idUsuario)) {
        userMap.set(entry.idUsuario, { nombre: entry.nombre, cantidad: 0 });
      }
      userMap.get(entry.idUsuario).cantidad += 1;
    });

    const auxGrafico =Array.from(userMap.values())

    
    this.graficoIngresos = {
      xAxis: {
        type: 'category',
        data: auxGrafico.map(item => item.nombre)
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: auxGrafico.map(item => item.cantidad),
        type: 'line',
        areaStyle: {}
      }]
    };
    /*
       this.graficoIngresos =*/


  }

  generarInformeEspecialidades() {
    const especialidadesConCantidad: any[] = [];

    this.turnos.forEach(turno => {
      const nombreEspecialidad = turno.especialidad.nombre;

      const especialidadEncontrada = especialidadesConCantidad.find(
        especialidad => especialidad.nombre === nombreEspecialidad
      );

      if (especialidadEncontrada) {
        especialidadEncontrada.cantidad++;
      } else {
        especialidadesConCantidad.push({
          nombre: nombreEspecialidad,
          cantidad: 1
        });
      }
    });

    this.informeTurnosPorEspecialidad = especialidadesConCantidad
    this.graficoTurnosPorEspecialidad =  {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: especialidadesConCantidad.map(item=>item.nombre),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'especialidad',
          type: 'bar',
          barWidth: '60%',
          data: especialidadesConCantidad.map(item=>item.cantidad),
        },
      ],
    };

  }



  generarInformeTurnosPorDia() {
    const turnosPorDia: any[] = [];

    this.turnos.forEach(turno => {
      const fechaDia = turno.dia.seconds;
      const fechaDiaString = new Date(fechaDia * 1000).toISOString().slice(0, 10); // Formato YYYY-MM-DD

      const turnoPorDiaEncontrado = turnosPorDia.find(
        turnoDia => turnoDia.fecha === fechaDiaString
      );

      if (turnoPorDiaEncontrado) {
        turnoPorDiaEncontrado.cantidadTurnos++;
      } else {
        turnosPorDia.push({
          fecha: fechaDiaString,
          cantidadTurnos: 1
        });
      }
    });

    this.informeTurnosPorDia = turnosPorDia

    this.graficoTurnosPorDia = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data:turnosPorDia.map(item=>item.fecha),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Cantidad de turnos',
          type: 'bar',
          barWidth: '60%',
          data: turnosPorDia.map(item=>item.cantidadTurnos),
        },
      ],
    };

  }


  generarInformeTurnos() {
    const especialistasConCantidad: any[] = [];

    this.turnos.forEach(turno => {
      const nombreEspecialista = turno.especialista.nombre;

      const especialistaEncontrado = especialistasConCantidad.find(
        especialista => especialista.nombre === nombreEspecialista
      );

      if (especialistaEncontrado) {
        especialistaEncontrado.cantidadTurnos++;
      } else {
        especialistasConCantidad.push({
          nombre: nombreEspecialista,
          cantidadTurnos: 1
        });
      }
    });


    this.informeTurnosPorEspecialista = especialistasConCantidad

    this.graficoTurnosPorEspecialista = {
      
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} turnos ({d}%)',
      },
      legend: {
        align: 'auto',
        bottom: 10,
        data: especialistasConCantidad.map(item=>item.nombre),
      },
      calculable: true,
      series: [
        {
          name: 'especialista',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: especialistasConCantidad.map(item=>({name:item.nombre,value:item.cantidadTurnos}))
        },
      ],
    };

  }


  generarInformeTurnosRealizados() {
    const especialistasConCantidad: any[] = [];

    this.turnos.forEach(turno => {
      if (turno.estado === "realizado") {
        const nombreEspecialista = turno.especialista.nombre;

        const especialistaEncontrado = especialistasConCantidad.find(
          especialista => especialista.nombre === nombreEspecialista
        );

        if (especialistaEncontrado) {
          especialistaEncontrado.cantidadTurnos++;
        } else {
          especialistasConCantidad.push({
            nombre: nombreEspecialista,
            cantidadTurnos: 1
          });
        }
      }
    })
    this.informeTurnosFinalizados = especialistasConCantidad

    this.graficoTurnosFinalizados = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} turnos ({d}%)',
      },
      legend: {
        align: 'auto',
        bottom: 10,
        data: especialistasConCantidad.map(item=>item.nombre),
      },
      calculable: true,
      series: [
        {
          name: 'especialista',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: especialistasConCantidad.map(item=>({name:item.nombre,value:item.cantidadTurnos})),
        },
      ],
    };
  }
}

