import { inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const noLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  //const user =localStorage.getItem('user')

return new Promise((resolve)=>{
  onAuthStateChanged(getAuth(),auth=>{
  
    if(!auth){// || !user){
      resolve(true)
    }else{
      //toasSvc.error("Ya se encuentra logueado")
      resolve(router.createUrlTree(['/auth']))
    }
  })
})
};
