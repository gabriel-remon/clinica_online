import { Routes } from '@angular/router';

export const routes_pacientes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./pacientes.component').then(m=>m.PacientesComponent)
    },
    {
        path: ':id',
        loadComponent : ()=> import('./paciente/paciente.component').then(m=>m.PacienteComponent)
    },
];
