import { Time } from "@angular/common";
import { Especialidad } from "./especialidades.model";
import { ObraSocial } from "./obra.social.model";


export interface User{
    _id:string ,
    email:string ,
    nombre:string ,
    apellido:string,
    dni:string,
    fecha_nacimiento:string,
    foto_perfil:string,
    rol: "admin"|"especialista" | "paciente",
    horario :Horarios[] |null
    //atributos del especialista
    especialidades:Especialidad[]|null,
    especialista_valido:boolean|null,
    
    //atributos del paciente
    obra_social:ObraSocial|null,
    foto_paciente:string|null,
}

export type Horarios ={
    dia:string,
    hora_inicio:Time,
    hora_fin:Time,
    activo:boolean
}