import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Turno } from '../../../core/models/turno.model';
import { TurnoService } from '../../../core/services/turno.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ComentarioComponent } from '../../modals/comentario/comentario.component';
import { ToastrService } from 'ngx-toastr';
import { MostrarTextoComponent } from '../../modals/mostrar-texto/mostrar-texto.component';
import { AtencionComponent } from '../../modals/atencion/atencion.component';
import { EncuestaComponent } from '../../modals/encuesta/encuesta.component';
import { HistorialComponent } from '../../modals/historial/historial.component';

@Component({
  selector: 'app-tabla-turnos',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './tabla.turnos.component.html',
  styleUrl: './tabla.turnos.component.css'
})
export class TablaTurnosComponent {


  @Input()turnos:Turno[]=[]
  @Input()rol!:'admin'|'especialista'|'paciente'
  @Output() especialidadSelect = new EventEmitter<Turno>();


  readonly dialog = inject(MatDialog);
  toastSvc = inject(ToastrService)
  turnosSvc =inject(TurnoService)

  stars = [0, 1, 2, 3, 4]
  
  cancelarTurno(turno:Turno){

    
    const dialogRef = this.dialog.open(ComentarioComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        turno.estado = 'cancelado'
        turno.comentario = result
        this.turnosSvc.modificarTuro(turno).then(data=>{
          if(data.estado){
            this.toastSvc.success(data.mensaje)
          }else{
            this.toastSvc.error(data.mensaje)
          }
        })
      }else{
        this.toastSvc.error("Debe dejar un comentario por el motivo de la cancelacion")
      }
    });
  }




  rechazarTurno(turno:Turno){
    
    const dialogRef = this.dialog.open(ComentarioComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        turno.estado = 'rechazado'
        turno.comentario = result
        this.turnosSvc.modificarTuro(turno).then(data=>{
          if(data.estado){
            this.toastSvc.success(data.mensaje)
          }else{
            this.toastSvc.error(data.mensaje)
          }
        })
      }else{
        this.toastSvc.error("Debe dejar un comentario por el motivo del rechazo")
      }
    });
  }
  aceptarTurno(turno:Turno){
    turno.estado = 'aceptado'
    this.turnosSvc.modificarTuro(turno)
  }

  finalizarTurno(turno:Turno){
   
    const dialogRef = this.dialog.open(ComentarioComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        turno.estado = 'realizado'
        turno.comentario = result
        this.turnosSvc.modificarTuro(turno).then(data=>{
          if(data.estado){
            this.toastSvc.success(data.mensaje)
          }else{
            this.toastSvc.error(data.mensaje)
          }
        })
      }else{
        this.toastSvc.error("Debe dejar un comentario para finalizar el turno")
      }
    });
  }

  calificar(turno:Turno){
    
    
    const dialogRef = this.dialog.open(AtencionComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result !== undefined) {
        turno.atencion = result
        this.turnosSvc.modificarTuro(turno)
      }
    });


  }


  verResenia(turno:Turno){
    console.log(turno)
    if(turno.comentario){
      this.dialog.open(MostrarTextoComponent,{  data:turno.comentario});
    }
    
  }
  completarEncuesta(turno:Turno){
    const dialogRef = this.dialog.open(EncuestaComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        turno.encuesta = result
        this.turnosSvc.modificarTuro(turno)
      }
    });
  }

  cargarHistorial(turno:Turno){
    const dialogRef = this.dialog.open(HistorialComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        turno.historia_clinica = result
        this.turnosSvc.modificarTuro(turno)
      }
    });
  }

  seleccionar(turno:Turno){
    this.especialidadSelect.emit(turno)
  }
}
