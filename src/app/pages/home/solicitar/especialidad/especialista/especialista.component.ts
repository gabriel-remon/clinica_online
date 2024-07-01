import { Component } from '@angular/core';
import { TablaHorariosComponent } from '../../../../../components/tablas/tabla.horarios/tabla.horarios.component';
import { PerfilComponent } from '../../../perfil/perfil.component';
import { HeaderComponent } from '../../../../../components/header/header.component';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [TablaHorariosComponent,PerfilComponent,HeaderComponent],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.css'
})
export class EspecialistaComponent {

}
