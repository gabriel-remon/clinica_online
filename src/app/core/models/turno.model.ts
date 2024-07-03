import { Time } from "@angular/common"
import { Especialidad } from "./especialidades.model"
import { calificacion } from "./calificacion.type"
import { Encuesta } from "./encuesta.model"
import { HistoriaClinica } from "./historia.clinica.model"

export interface Turno {
    id:string ,
    dia:Date,
    especialista:{
        nombre:string,
        apellido:string,
        id:string,
        foto:string
    },
    paciente:{
        nombre:string, 
        apellido:string, 
        id:string,
        foto:string
    },
    estado:'pendiente'|'aceptado'|'rechazado'|'realizado'|'cancelado',
    especialidad:Especialidad,
    atencion: calificacion|null,
    hora_inicio: Time,
    hora_fin: Time,
    comentario:string|null,
    encuesta:Encuesta|null,
    historia_clinica:HistoriaClinica|null
}