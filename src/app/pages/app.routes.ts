import { Routes } from '@angular/router';
import { noLoginGuard } from '../core/guards/no-login.guard';
import { loginGuard } from '../core/guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.routes').then(m=>m.routes_auth)
        //canActivate:[noLoginGuard]
    },
    {
        path: 'home',
        loadChildren: ()=> import('./home/home.routes').then(m=>m.routes_home),
        //canActivate:[loginGuard]
    },
    {
        path: '**',
        loadComponent : ()=> import('./error/error.component').then(m=>m.ErrorComponent)
    },
];
