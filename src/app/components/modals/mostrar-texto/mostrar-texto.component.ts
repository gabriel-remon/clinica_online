import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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

@Component({
  selector: 'app-mostrar-texto',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mostrar-texto.component.html',
  styleUrl: './mostrar-texto.component.css'
})
export class MostrarTextoComponent {
  readonly comentarios:string = inject<string>(MAT_DIALOG_DATA);
  
  readonly dialogRef = inject(MatDialogRef<MostrarTextoComponent>);

}
