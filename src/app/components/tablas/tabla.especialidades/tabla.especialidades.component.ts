import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Especialidad } from '../../../core/models/especialidades.model';
import { EspecialidadService } from '../../../core/services/especialidad.service';
import { MatDialog } from '@angular/material/dialog';
import { FormEspecialidadComponent } from '../../modals/form.especialidad/form.especialidad.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tabla-especialidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.especialidades.component.html',
  styleUrl: './tabla.especialidades.component.css'
})
export class TablaEspecialidadesComponent {


  @Output() especialidadSelect = new EventEmitter<Especialidad>();

  @Input() obra_sociales! : Especialidad[] |[];
  @Input() agregar : boolean=true;
  EspecialidadSvc = inject(EspecialidadService)
  dialog= inject(MatDialog)
  spinerSvc = inject(NgxSpinnerService)


  ngOnInit(): void {
    if(!this.obra_sociales){
      this.spinerSvc.show()
      this.EspecialidadSvc.getData(Especialidad =>{
        this.spinerSvc.hide()
        this.obra_sociales = Especialidad
      })
    }
  }



  agregarEspecilidad(){

      const dialogRef = this.dialog.open(FormEspecialidadComponent);
  
      dialogRef.afterClosed().subscribe(result => {});
    

/*
    const dialogRef = this.dialog.open(FormEspecialidadComponent, {
      width: '400px',
      height: '480px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      // Puedes manejar el resultado aquí si lo necesitas
    });*/
  }
  

  

  seleccionar(especialidad:Especialidad){
    console.log(especialidad)
    this.especialidadSelect.emit(especialidad)
  }

}
