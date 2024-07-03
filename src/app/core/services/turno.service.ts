import { Injectable, inject } from '@angular/core';
import { Firestore, QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, doc, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
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

  turnoDePaciente(idPaciente:string,funcion:(repartidores:Turno[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef,where('paciente.id','==',idPaciente)   )
    
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




  async newData(turno: Turno) {
    const retorno = { mensaje: "error el crear el turno", estado: false }
    const document = collection(getFirestore(), (this.tabla))
    const documentRef = doc(document)
    turno.id = documentRef.id

    return setDoc(documentRef, turno).then(res => {
      retorno.estado = true
      retorno.mensaje = "turno creado con exito"
      return retorno
    }).catch(err => {
      retorno.mensaje = err.message
      return retorno
    })
  }


  async modificarTuro(turno: Turno): Promise<{ mensaje: string, estado: boolean }> {
    const retorno: any = { mensaje: "error al modificar el turno", estado: false }

    try {
      const document = doc(collection(getFirestore(), this.tabla),turno.id)
      await updateDoc(document, { ...turno })
      retorno.estado = true
      retorno.mensaje = "Turno modificado con exito"
      return retorno
    } catch (err) {
      retorno.mensaje = err
      return retorno
    }
  }

}
