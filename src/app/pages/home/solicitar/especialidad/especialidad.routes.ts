import { Routes } from '@angular/router';

export const routes_especialidad: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./especialidad.component').then(m=>m.EspecialidadComponent)
    },
    {
        path: 'idespecialista',
        loadComponent : ()=> import('./especialista/especialista.component').then(m=>m.EspecialistaComponent)
    }
];
