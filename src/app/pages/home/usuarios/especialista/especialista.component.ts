import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../../../components/form.register/form.register.component';
import { ListadoEspecialidadesComponent } from '../../../../components/listados/listado.especialidades/listado.especialidades.component';
import { TablaEspecialidadesComponent } from '../../../../components/tablas/tabla.especialidades/tabla.especialidades.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [FormRegisterComponent,ListadoEspecialidadesComponent,TablaEspecialidadesComponent,HeaderComponent],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.css'
})
export class EspecialistaComponent {

}
