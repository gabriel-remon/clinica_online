import { Routes } from '@angular/router';

export const routes_home: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./home.component').then(m=>m.HomeComponent)
    },
    {
        path: 'perfil',
        loadComponent: ()=> import('./perfil/perfil.component').then(m=>m.PerfilComponent)
    },
    {
        path: 'solicitar',
        loadChildren: ()=> import('./solicitar/solicitar.routes').then(m=>m.routes_solicitar)
    },
    {
        path: 'turnos',
        loadChildren: ()=> import('./turnos/turnos.routes').then(m=>m.routes_turnos)
    },
    {
        path: 'usuarios',
        loadChildren: ()=> import('./usuarios/usuarios.routes').then(m=>m.routes)
    },
    {
        path: 'pacientes',
        loadChildren: ()=> import('./pacientes/pacientes.routes').then(m=>m.routes_pacientes)
    },
];
