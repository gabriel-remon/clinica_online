import { Component } from '@angular/core';
import { TablaPacientesComponent } from '../../../components/tablas/tabla.pacientes/tabla.pacientes.component';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [TablaPacientesComponent,HeaderComponent],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {

}
