import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./usuarios.component').then(m=>m.UsuariosComponent)
    },
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
    },
    {
        path: 'historial/:id',
        loadComponent : ()=> import('./historial/historial.component').then(m=>m.HistorialUseresComponent)
    },
];
