import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Encuesta } from '../../../core/models/encuesta.model';
import { HistoriaClinica } from '../../../core/models/historia.clinica.model';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
    CommonModule,
  ReactiveFormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  readonly dialogRef = inject(MatDialogRef<HistorialComponent>);

  historial:HistoriaClinica={
    altura:1,
    peso:0,
    presion:0,
    temperatura:0,
    datos_dinamicos:null,
  }

  valor2:boolean=false
  valor3:boolean=false
  valor1:boolean=false


  form = new FormGroup({
    altura: new FormControl('', [Validators.required, Validators.min(30), Validators.max(300)]),
    peso: new FormControl('', [Validators.required,Validators.min(0.1),Validators.max(200)]),
    presion: new FormControl('', [Validators.required,Validators.min(50),Validators.max(150)]),
    temperatura: new FormControl('', [Validators.required,Validators.min(30),Validators.max(45)]),
    clave1: new FormControl(''),
    valor1: new FormControl(''),
    clave2: new FormControl(''),
    valor2: new FormControl(''),
    clave3: new FormControl(''),
    valor3: new FormControl(''),
  })

  submit(): void {

    this.historial={
      altura:this.form.value.altura,
      peso:this.form.value.peso,
      presion:this.form.value.presion,
      temperatura:this.form.value.temperatura,
      datos_dinamicos:[],
    }

    if(this.valor1){
      this.historial.datos_dinamicos?.push({
        clave: this.form.value.clave1 as string,
        valor: this.form.value.valor1 as string,
      })
    }
    if(this.valor2){
      this.historial.datos_dinamicos?.push({
        clave: this.form.value.clave2 as string,
        valor: this.form.value.valor2 as string,
      })
    }
    if(this.valor3){
      this.historial.datos_dinamicos?.push({
        clave: this.form.value.clave3 as string,
        valor: this.form.value.valor3 as string,
      })
    }

    this.dialogRef.close(this.historial);
  }
}
