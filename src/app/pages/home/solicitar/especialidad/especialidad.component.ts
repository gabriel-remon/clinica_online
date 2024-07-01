import { Component } from '@angular/core';
import { TablaEspecialistaComponent } from '../../../../components/tablas/tabla.especialista/tabla.especialista.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [TablaEspecialistaComponent,HeaderComponent],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent {

}
