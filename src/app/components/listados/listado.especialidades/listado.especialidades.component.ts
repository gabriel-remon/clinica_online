import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Especialidad } from '../../../core/models/especialidades.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-listado-especialidades',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './listado.especialidades.component.html',
  styleUrl: './listado.especialidades.component.css'
})
export class ListadoEspecialidadesComponent {

  @Output() especialidadesActuales = new EventEmitter<Especialidad[]>();

  @Input() editable: boolean=true;
  @Input() especialidaIn!: Especialidad|null;
  @Input() listaEspecialidades!: Especialidad[]|null;
  toastSvc = inject(ToastrService)
  especialidades: Especialidad[] = []


  enviarEspecialidades(){
    this.especialidadesActuales.emit(this.especialidades)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.listaEspecialidades){
      this.especialidades = this.listaEspecialidades
    }
  }
  ngOnChanges(){
    if(this.especialidaIn){
      if(!this.especialidades.includes(this.especialidaIn)){
        this.especialidades.push(this.especialidaIn)
        this.toastSvc.success("Especialidad agregada")
        this.enviarEspecialidades()
      }else{
        this.toastSvc.error("Ya posee esta especialidad")
      }
      this.especialidaIn = null
    }
  }

  eliminarItem(especialida: Especialidad) {
    if (this.especialidades.includes(especialida) && this.editable) {
      const index = this.especialidades.indexOf(especialida);
      if (index > -1) {
        this.especialidades.splice(index, 1);
        this.enviarEspecialidades()
      }
    }
  }


}
