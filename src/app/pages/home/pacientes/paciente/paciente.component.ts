import { Component } from '@angular/core';
import { PerfilComponent } from '../../perfil/perfil.component';
import { HistoralPacienteComponent } from '../../../../components/historal.paciente/historal.paciente.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [PerfilComponent,HistoralPacienteComponent,HeaderComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

}
