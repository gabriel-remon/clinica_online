import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CarruselEspecialidadesComponent } from '../../components/carrusel.especialidades/carrusel.especialidades.component';
import { PerfilMinComponent } from '../../components/perfil.min/perfil.min.component';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,
    PerfilMinComponent,
    CarruselEspecialidadesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
utilsSvc =inject(UtilService)
  
}
