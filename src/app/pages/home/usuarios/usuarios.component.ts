import { Component } from '@angular/core';
import { ListadoUsuariosComponent } from '../../../components/listados/listado.usuarios/listado.usuarios.component';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ListadoUsuariosComponent,HeaderComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
