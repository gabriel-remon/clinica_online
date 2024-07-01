import { Component } from '@angular/core';
import { ListadoEspecialidadesComponent } from '../../../components/listados/listado.especialidades/listado.especialidades.component';
import { TablaEspecialidadesComponent } from '../../../components/tablas/tabla.especialidades/tabla.especialidades.component';
import { HorarioEspecialistaComponent } from '../../../components/horario.especialista/horario.especialista.component';
import { HistoralPacienteComponent } from '../../../components/historal.paciente/historal.paciente.component';
import { TablaObraSocialComponent } from '../../../components/tablas/tabla.obra.social/tabla.obra.social.component';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [PerfilComponent,ListadoEspecialidadesComponent,TablaEspecialidadesComponent,
    HorarioEspecialistaComponent,HistoralPacienteComponent,TablaObraSocialComponent,
    HeaderComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
