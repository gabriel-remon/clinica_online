import { Component, Input } from '@angular/core';
import { ListadoEspecialidadesComponent } from '../../../components/listados/listado.especialidades/listado.especialidades.component';
import { TablaEspecialidadesComponent } from '../../../components/tablas/tabla.especialidades/tabla.especialidades.component';
import { HorarioEspecialistaComponent } from '../../../components/horario.especialista/horario.especialista.component';
import { HistoralPacienteComponent } from '../../../components/historal.paciente/historal.paciente.component';
import { TablaObraSocialComponent } from '../../../components/tablas/tabla.obra.social/tabla.obra.social.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { PerfilComponent } from '../../../components/perfil/perfil.component';
import { ItemObraSocialComponent } from '../../../components/items/item.obra.social/item.obra.social.component';
import { ObraSocial } from '../../../core/models/obra.social.model';
import { Especialidad } from '../../../core/models/especialidades.model';

@Component({
  selector: 'page-perfil',
  standalone: true,
  imports: [PerfilComponent,ListadoEspecialidadesComponent,TablaEspecialidadesComponent,
    HorarioEspecialistaComponent,HistoralPacienteComponent,TablaObraSocialComponent,
    HeaderComponent,ItemObraSocialComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilPage {
  obraSocial:ObraSocial|null = null;
  especialidades : Especialidad[]|null=null

  @Input() rol !: 'admin'|'especialista'|'paciente'
}
