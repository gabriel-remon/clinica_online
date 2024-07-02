import { Component, inject } from '@angular/core';
import { TablaEspecialidadesComponent } from '../../../components/tablas/tabla.especialidades/tabla.especialidades.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { Especialidad } from '../../../core/models/especialidades.model';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'app-solicitar',
  standalone: true,
  imports: [TablaEspecialidadesComponent,HeaderComponent],
  templateUrl: './solicitar.component.html',
  styleUrl: './solicitar.component.css'
})
export class SolicitarComponent {

  utilSvc = inject(UtilService)

  seleccionar(item:Especialidad){
    this.utilSvc.goto('home/solicitar/',item.id)
    console.log(item)
  }
}
