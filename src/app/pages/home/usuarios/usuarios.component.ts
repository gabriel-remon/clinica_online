import { Component, inject } from '@angular/core';
import { ListadoUsuariosComponent } from '../../../components/listados/listado.usuarios/listado.usuarios.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ListadoUsuariosComponent,HeaderComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  utilSvc = inject(UtilService)
}
