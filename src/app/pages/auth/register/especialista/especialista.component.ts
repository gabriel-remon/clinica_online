import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../../../components/form.register/form.register.component';
import { ListadoEspecialidadesComponent } from '../../../../components/listados/listado.especialidades/listado.especialidades.component';
import {  TablaEspecialidadesComponent } from '../../../../components/tablas/tabla.especialidades/tabla.especialidades.component';
import { BackComponent } from '../../../../components/back/back.component';
import { Especialidad } from '../../../../core/models/especialidades.model';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [FormRegisterComponent,
    ListadoEspecialidadesComponent,
    TablaEspecialidadesComponent,
    BackComponent],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.css'
})
export class EspecialistaComponent {
  especialida!:Especialidad;
  especialidades:Especialidad[]=[]
  seleccionarNueva(especialida:Especialidad){
    this.especialida = especialida
  }

  enviarAlForm(especialidades : Especialidad[]){
    this.especialidades = especialidades
  }
}
