import { Routes } from '@angular/router';

export const routes_solicitar: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./solicitar.component').then(m=>m.SolicitarComponent)
    },
    {
        path: 'solicitar',
        loadChildren: ()=> import('./especialidad/especialidad.routes').then(m=>m.routes_especialidad)
    }
];
