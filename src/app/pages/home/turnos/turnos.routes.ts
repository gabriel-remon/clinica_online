import { Routes } from '@angular/router';

export const routes_turnos: Routes = [
   
    {
        path: 'admin',
        loadComponent : ()=> import('./admin/admin.component').then(m=>m.AdminComponent)
    },
    {
        path: 'especialista',
        loadComponent : ()=> import('./especialista/especialista.component').then(m=>m.EspecialistaComponent)
    },
    {
        path: 'paciente',
        loadComponent : ()=> import('./paciente/paciente.component').then(m=>m.PacienteComponent)
    }
];
