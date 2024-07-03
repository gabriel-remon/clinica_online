import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../form.especialidad/form.especialidad.component';

@Component({
  selector: 'app-hora-turno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hora-turno.component.html',
  styleUrl: './hora-turno.component.css'
})
export class HoraTurnoComponent {
  readonly dialogRef = inject(MatDialogRef<HoraTurnoComponent>);
  readonly horarios:any[] = inject<any[]>(MAT_DIALOG_DATA);

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  console.log(this.horarios)
}

  seleccionar(hora:any){
    this.dialogRef.close(hora);
  }
}
