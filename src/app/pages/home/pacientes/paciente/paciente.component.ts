import { Component } from '@angular/core';
import { HistoralPacienteComponent } from '../../../../components/historal.paciente/historal.paciente.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { PerfilComponent } from '../../../../components/perfil/perfil.component';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [PerfilComponent,HistoralPacienteComponent,HeaderComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

}
