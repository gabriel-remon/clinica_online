import { Routes } from '@angular/router';

export const routes_auth: Routes = [

    {
        path: '',
        loadComponent: ()=> import('./auth.component').then(m=>m.AuthComponent)
    },
    {
        path: 'register',
        loadChildren: ()=> import('./register/register.routes').then(m=>m.routes_register)
    }
];
