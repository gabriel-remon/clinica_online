import { Component, EventEmitter, Input, Output, inject, model, signal } from '@angular/core';
import { ObraSocial } from '../../../core/models/obra.social.model';
import { ObraSocialService } from '../../../core/services/obra.social.service';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { FormObraSocialComponent } from '../../modals/form.obra.social/form.obra.social.component';
@Component({
  selector: 'app-tabla.obra.social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.obra.social.component.html',
  styleUrl: './tabla.obra.social.component.css'
})
export class TablaObraSocialComponent {

  @Output() heladoElegido = new EventEmitter<ObraSocial>();

  @Input()obra_sociales! : ObraSocial[] |[];
  obraSocialSvc = inject(ObraSocialService)


  ngOnInit(): void {
    if(!this.obra_sociales){
      this.obraSocialSvc.getData(obraSocial =>{
        this.obra_sociales = obraSocial
        console.log(obraSocial)
      })
    }
  }

  dialog= inject(MatDialog)
  readonly animal = signal('');
  readonly name = model('');

  agregarEspecilidad(){



      const dialogRef = this.dialog.open(FormObraSocialComponent, {
        
        data: {name: this.name(), animal: this.animal()},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          this.animal.set(result);
        }
      });
    

/*
    const dialogRef = this.dialog.open(FormObraSocialComponent, {
      width: '400px',
      height: '480px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      // Puedes manejar el resultado aquí si lo necesitas
    });*/
  }
  

  

  seleccionar(helado:ObraSocial){
    console.log(helado)
    this.heladoElegido.emit(helado)
  }

}
