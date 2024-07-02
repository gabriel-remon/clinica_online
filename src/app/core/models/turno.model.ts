import { Time } from "@angular/common"
import { Especialidad } from "./especialidades.model"

export interface Turno {
    id:string ,
    dia:string,
    especialista:{
        nombre:string,
        apellido:string,
        id:string,
        foto:string
    },
    paciente:{
        nombre:string, 
        apellido:string, 
        id:string},
    estado:'aceptado'|'rechazado'|'realizado'|'cancelado',
    especialidad:Especialidad,
    atencion: 1|2|3|4|5|6|7|8|9|10|undefined,
    hora: Time
}