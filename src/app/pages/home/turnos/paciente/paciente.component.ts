import { Component } from '@angular/core';
import { TablaTurnosComponent } from '../../../../components/tablas/tabla.turnos/tabla.turnos.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [TablaTurnosComponent,HeaderComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

}
