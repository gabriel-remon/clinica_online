import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { TurnoService } from '../../../core/services/turno.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fitro-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fitro-paciente.component.html',
  styleUrl: './fitro-paciente.component.css'
})
export class FitroPacienteComponent {

  readonly dialogRef = inject(MatDialogRef<User>);

  @Input() especialistas:User[]=[]

  @Output() especialidadSelect = new EventEmitter<User>();

  authSvc = inject(AuthService)
  pacientes :User[]=[]
  spinnerSvc = inject(NgxSpinnerService)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.spinnerSvc.show()
    this.authSvc.getDataPacientes(data=>{
      this.pacientes=data

    },()=>this.spinnerSvc.hide())
  }

  turnosSvc =inject(TurnoService)


  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
  
    return edad;
  }

  seleccionar(especialista:User){
    
    this.dialogRef.close(especialista);
    this.especialidadSelect.emit(especialista)
  }
}
