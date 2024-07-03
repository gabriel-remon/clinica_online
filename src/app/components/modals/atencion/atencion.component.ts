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
import {MatInputModule} from '@angular/material/input';
import { calificacion } from '../../../core/models/calificacion.type';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atencion',
  standalone: true,
  imports:  [
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
  templateUrl: './atencion.component.html',
  styleUrl: './atencion.component.css'
})
export class AtencionComponent {

  readonly dialogRef = inject(MatDialogRef<AtencionComponent>);
  texto:calificacion|undefined
  onNoClick(): void {
    this.dialogRef.close(this.rating);
  
}


rating = 1;
tempRating = 0;
stars = [0, 1, 2, 3, 4]; // Representa las 10 estrellas, permitiendo media estrella

hoverRating(rating: number) {
  this.tempRating = rating;
}

resetRating() {
  this.tempRating = this.rating;
}

rate(rating: number) {
  this.rating = rating;
  console.log('Calificación seleccionada:', this.rating);

}
}
