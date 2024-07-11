import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../../../components/form.register/form.register.component';
import { ItemObraSocialComponent } from '../../../../components/items/item.obra.social/item.obra.social.component';
import { TablaObraSocialComponent } from '../../../../components/tablas/tabla.obra.social/tabla.obra.social.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { ObraSocial } from '../../../../core/models/obra.social.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [FormRegisterComponent,ItemObraSocialComponent,TablaObraSocialComponent,HeaderComponent,CommonModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

  obraSocial!:ObraSocial;

  seleccionar(obraSocial:ObraSocial){
    this.obraSocial = obraSocial
  }
}
