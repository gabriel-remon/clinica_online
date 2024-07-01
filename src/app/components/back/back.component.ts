import { Component, Input, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [],
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {
  utilSvc = inject(UtilService)

  @Input() path!:string;

  paginaAnterior(){
    this.utilSvc.goto(this.path)
  }
}
