import { Time } from "@angular/common"

export interface Turno {
    id:string ,
    dia:string,
    especialista:{
        nombre:string,
        especialidad:string,
        id_especialista:string
    },
    paciente:{
        nombre:string, 
        obra_social:string,
        id_paciente:string},
    estado:'aceptado'|'rechazado'|'realizado'|'cancelado',
    atencion: 1|2|3|4|5|6|7|8|9|10|undefined,
    hora_inicio: Time,
    hora_fin: Time
}