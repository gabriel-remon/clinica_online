import { Component } from '@angular/core';
import { TablaTurnosComponent } from '../../../../components/tablas/tabla.turnos/tabla.turnos.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [TablaTurnosComponent,HeaderComponent],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.css'
})
export class EspecialistaComponent {

}
