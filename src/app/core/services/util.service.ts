import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  http = inject( HttpClient)
  router = inject(Router)

  goto(path : string,params?:string){
    if(params){
      
      this.router.navigate([path,params]);
    }else{
      this.router.navigate([path]);

    }
  }
}
