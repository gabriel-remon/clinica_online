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
    if (this.especialidaIn) {
      // Verificar si la especialidad ya existe en el array
      const especialidadExiste = this.especialidades.some(especialidad => especialidad.nombre === this.especialidaIn?.nombre);
      
      // Verificar si el id del item no está incluido en ninguno de los items del array
      const idExiste = this.especialidades.some(especialidad => especialidad.id === this.especialidaIn?.id);
    
      if (!especialidadExiste && !idExiste) {
        this.especialidades.push(this.especialidaIn);
        this.toastSvc.success("Especialidad agregada");
        this.enviarEspecialidades();
      } else {
        if (especialidadExiste) {
          this.toastSvc.error("Ya posee esta especialidad");
        } else if (idExiste) {
          this.toastSvc.error("El id de la especialidad ya está en uso");
        }
      }
    
      this.especialidaIn = null;
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
