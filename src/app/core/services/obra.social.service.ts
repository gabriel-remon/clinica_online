
import { Injectable, inject } from '@angular/core';
import { ObraSocial } from '../models/obra.social.model';
import { Firestore, QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {

  private tabla = 'obraSocial'

  //firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)
  storage = getStorage();
  obrassociales!: ObraSocial[];

  constructor(){
    this.getData((data)=>{
      this.obrassociales = data
    })
  }

  async newData(helado: ObraSocial,file:any) {

    const retorno = {mensaje:"error el crear el helado",estado:false}

    return addDoc(collection(getFirestore(),(this.tabla)),helado).then(async res=>{
      helado.id = res.id
      console.log(res)
      await this.updateData(helado,file)

      retorno.estado= true
      retorno.mensaje= "Helado guardado con exito"
      return retorno
    }).catch(err=>{
      retorno.mensaje= err.message
      return retorno
    })
  }

 async  updateData(helado:ObraSocial,file?:any){

  const retorno :any = {mensaje:"error el crear el helado",estado:false}
  
  try{
    const document = doc(this.dbFirebase,this.tabla,helado.id)
    helado.src_foto = await this.guardarFoto(file,helado.id)
    await updateDoc(document,{ ...helado})
    retorno.estado = true
    retorno.mensaje = "helado modificado con exito"
    return retorno
  }catch(err){
    retorno.mensaje = err
    return retorno
  }
  }

  async guardarFoto(foto: any, path: string) {
    let storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, foto)
    return await getDownloadURL(storageRef)
  }

  getData(funcion:(repartidores:ObraSocial[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef)
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :ObraSocial[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as ObraSocial
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

  
  getObraSocial(id_obra_social:string|null):ObraSocial|null{
    let retorno:ObraSocial|null = null;
    this.obrassociales.forEach(element => {
      if(element.id == id_obra_social){
        retorno = element
        return
      }
    });
    return retorno
  }
}
