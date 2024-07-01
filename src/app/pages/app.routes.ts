import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.routes').then(m=>m.routes_auth),
        //canActivate:[noAuthGuard]
    },
    {
        path: 'home',
        loadChildren: ()=> import('./home/home.routes').then(m=>m.routes_home)
    },
    {
        path: '**',
        loadComponent : ()=> import('./error/error.component').then(m=>m.ErrorComponent)
    },
];
