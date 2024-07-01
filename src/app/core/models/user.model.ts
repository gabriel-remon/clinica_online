import { Especialidad } from "./especialidades.model";


export interface User{
    _id:string ,
    email:string ,
    nombre:string ,
    apellido:string,
    dni:string,
    fecha_nacimiento:string,
    foto_perfil:string,
    rol: "admin"|"especialista" | "paciente",

    //atributos del especialista
    especialidades:Especialidad[]|null,
    especialista_valido:boolean|null,
    
    //atributos del paciente
    id_obra_social:string|null,
    foto_paciente:string|null,
}
