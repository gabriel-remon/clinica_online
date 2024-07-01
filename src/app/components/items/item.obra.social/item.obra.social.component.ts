import { Component, Input } from '@angular/core';
import { ObraSocial } from '../../../core/models/obra.social.model';

@Component({
  selector: 'app-item.obra.social',
  standalone: true,
  imports: [],
  templateUrl: './item.obra.social.component.html',
  styleUrl: './item.obra.social.component.css'
})
export class ItemObraSocialComponent {

  @Input() obraSocial:ObraSocial ={
    id:"aa",
    nombre:"test",
    src_foto:"s"
  };
}
