import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ObraSocialService } from '../../../core/services/obra.social.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ObraSocial } from '../../../core/models/obra.social.model';
import { CommonModule } from '@angular/common';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'modal-obra-social',
  templateUrl: './form.obra.social.component.html',
  styleUrl: './form.obra.social.component.css',
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
    CommonModule,
    ReactiveFormsModule
  ],
})
export class FormObraSocialComponent {
  readonly dialogRef = inject(MatDialogRef<FormObraSocialComponent>);

  tipoForm = "Agregar obra social"
  obraSocialSvc = inject(ObraSocialService)
  imagen: any;
  spinerSvc = inject(NgxSpinnerService)
  toasSvc = inject(ToastrService)





  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    foto: new FormControl('', [Validators.required])
  })

  close(): void {
    this.dialogRef.close();
  }


  cargarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file
    }
  }
  submit() {
    this.spinerSvc.show()
    const nuevoActor = {
      nombre: this.form.value.nombre as string,
      id: ""
    }

    this.obraSocialSvc.newData(nuevoActor as ObraSocial, this.imagen).then((data) => {
      if (data.estado) {
        this.toasSvc.success(data.mensaje)
      } else {
        this.toasSvc.error(data.mensaje)
      }
      this.close()
    }
    ).finally(() => this.spinerSvc.hide())
    this.form.reset()
  }
}