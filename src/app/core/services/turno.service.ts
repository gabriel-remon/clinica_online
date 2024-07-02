import { Injectable, inject } from '@angular/core';
import { Firestore, QueryDocumentSnapshot, QuerySnapshot, collection, onSnapshot, query, where } from '@angular/fire/firestore';
import { Turno } from '../models/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private tabla = 'turnos'
  dbFirebase =inject( Firestore)

  //firestore = inject(AngularFirestore)

  getData(funcion:(repartidores:Turno[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef)
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :Turno[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as Turno
          repartidores.push( repartidorIn)
        })
        funcion(repartidores)
        finaly?finaly():""
      })
    }catch(error){
      finaly?finaly():""
      return error
    }
  }

  turnoDeEspecialista(idEspecilista:string,funcion:(repartidores:Turno[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef,where('especialista.id','==',idEspecilista)   )
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :Turno[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as Turno
          repartidores.push( repartidorIn)
        })
        funcion(repartidores)
        finaly?finaly():""
      })
    }catch(error){
      finaly?finaly():""
      return error
    }
  }
}
