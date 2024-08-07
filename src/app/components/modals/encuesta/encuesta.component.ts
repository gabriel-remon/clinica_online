import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
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

@Component({
  selector: 'app-encuesta',
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
    CommonModule
  ],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  readonly dialogRef = inject(MatDialogRef<EncuestaComponent>);

  encuesta:Encuesta={
    instalaciones:true,
    precio:true,
    tiempo_espera:true,
    observacion:""
  }

  onNoClick(): void {
    this.dialogRef.close(this.encuesta);
  }
}
