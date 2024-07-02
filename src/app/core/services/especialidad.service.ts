import { Especialidad } from './../models/especialidades.model';
import { Injectable, inject } from '@angular/core';
import { Firestore, query,QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, getFirestore, onSnapshot, orderBy, deleteDoc, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { doc, updateDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {



  private tabla = 'especialidad'

  //firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)
  storage = getStorage();
  especialidades !: Especialidad[];


  constructor(){
    this.getData((data)=>{
      this.especialidades = data
    })
  }

  async newData(helado: Especialidad,file:any) {

    const retorno = {mensaje:"error el crear el helado",estado:false}
    const document = collection(getFirestore(),(this.tabla))
    const documentRef = doc(document)
    helado.id = documentRef.id
    helado.src_foto = await this.guardarFoto(file,helado.id)
    
    return setDoc(documentRef,helado).then(res=>{
      retorno.estado= true
      retorno.mensaje= "especialidad guardada con exito"
      return retorno
    }).catch(err=>{
      retorno.mensaje= err.message
      return retorno
    })
  }

  async guardarFoto(foto: any, path: string) {
    let storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, foto)
    return await getDownloadURL(storageRef)
  }

 async  updateData(helado:Especialidad){

  const retorno :any = {mensaje:"error el crear una especialidad",estado:false}
  
  try{
    const document = doc(this.dbFirebase,this.tabla,helado.id)
    await updateDoc(document,{ ...helado})
    retorno.estado = true
    retorno.mensaje = "epecialidad modificado con exito"
    return retorno
  }catch(err){
    retorno.mensaje = err
    return retorno
  }
  }

  getData(funcion:(repartidores:Especialidad[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef)
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :Especialidad[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as Especialidad
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

  delet(id: any) {
    return deleteDoc(doc(this.dbFirebase, this.tabla, id))
  }

  getEspecialidad(id_especialidad:string|null):Especialidad|null{
    let retorno:Especialidad|null = null;
    this.especialidades.forEach(element => {
      if(element.id == id_especialidad){
        retorno = element
        return
      }
    });
    return retorno
  }




  
}
