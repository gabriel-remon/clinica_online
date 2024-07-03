
export interface HistoriaClinica {
    altura:any,
    peso:any,
    temperatura:any,
    presion:any,
    datos_dinamicos:DatoDinamico[]|null
}

export type DatoDinamico={
    clave:string,
    valor:any
}
