import { Component } from '@angular/core';
import { TablaEspecialidadesComponent } from '../../../components/tablas/tabla.especialidades/tabla.especialidades.component';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-solicitar',
  standalone: true,
  imports: [TablaEspecialidadesComponent,HeaderComponent],
  templateUrl: './solicitar.component.html',
  styleUrl: './solicitar.component.css'
})
export class SolicitarComponent {

}
