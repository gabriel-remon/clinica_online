import { Routes } from '@angular/router';

export const routes_register: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./register.component').then(m=>m.RegisterComponent)
    },
    {
        path: 'especialista',
        loadComponent : ()=> import('./especialista/especialista.component').then(m=>m.EspecialistaComponent)
    },
    {
        path: 'paciente',
        loadComponent: ()=> import('./paciente/paciente.component').then(m=>m.PacienteComponent)
    }
];
