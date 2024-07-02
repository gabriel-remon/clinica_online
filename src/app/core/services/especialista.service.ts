
import { Injectable, inject } from '@angular/core';
import { Firestore, QueryDocumentSnapshot, QuerySnapshot, collection, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  private tabla = 'usuarios'
  dbFirebase =inject( Firestore)

  //firestore = inject(AngularFirestore)

  getData(funcion:(repartidores:User[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef,where('rol','==','especialista'))
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :User[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as User
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

  async obtenerEspecialistasPorEspecialidad(especialidadId:string) {
    try {
      // Referencia a la colección de especialistas
      const especialistasRef = collection(this.dbFirebase,this.tabla);
  
      // Consulta para obtener los especialistas que tienen la especialidad pasada por parámetro
      const q = query(especialistasRef, where("especialidades", "array-contains", especialidadId));
      const querySnapshot = await getDocs(q);
  
      // Array para almacenar los especialistas encontrados
      const especialistasEncontrados:any = [];
  
      querySnapshot.forEach((doc) => {
        // Agrega cada especialista encontrado al array
        especialistasEncontrados.push(doc.data());
      });
  
      return especialistasEncontrados;
    } catch (error) {
      console.error("Error al obtener especialistas: ", error);
      return [];
    }
  }
  
}
