import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  http = inject( HttpClient)
  router = inject(Router)

  goto(path : string){
    this.router.navigate([path]);
  }
}
