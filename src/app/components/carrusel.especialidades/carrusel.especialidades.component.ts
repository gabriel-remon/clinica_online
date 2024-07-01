import { Component, inject, OnInit } from '@angular/core';
import { EspecialidadService } from '../../core/services/especialidad.service';
import { Especialidad } from '../../core/models/especialidades.model';
import {  NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-carrusel-especialidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.especialidades.component.html',
  styleUrl: './carrusel.especialidades.component.css'
})
export class CarruselEspecialidadesComponent {

  especialidadesSvc = inject(EspecialidadService)
  especialidades:any =[]
  spinnerSvc =inject(NgxSpinnerService)
  utilSVc = inject(UtilService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class
    console.log('hola')
    this.spinnerSvc.show()
    this.especialidadesSvc.getData(data=>{
      console.log(data)
      this.spinnerSvc.hide()
      this.especialidades = data
      
      let result = []
      for(let i=0; i<data.length;i+=3){
        result.push(data.slice(i,i+3))
      }
     this.especialidades = result

    })
  }


  seleccionar(especialidad:any){
    console.log(especialidad)
    this.utilSVc.goto('home/solicitar',especialidad.id)
  }
}
