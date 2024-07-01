import { calificacion } from "./calificacion.type";

export interface Encuesta {
    id:string ,
    instalaciones: calificacion,
    precio: calificacion,
    tiempo_espera: calificacion,
    observacion:string
}

