# Medicos

Trabajo practico final de la materia laboratorio  4

## Descripcion

En este proyecto se crea una clinica virtual en la cual se administran los turnos de los pacientes y de los especialistas que brindan la atencion.
Se administra todo el proceso que imprica pedir un turno como la creacion del mismo, aceptacion, finalizacion y la carga del historial medico para el paciente que solicito el turno.

## Funcionalidades generales
- `Login`: El usuario se registra como un paciente, especialista o admin
- `Registro`: El usuario se registra como un paciente o especialista
- `Perfil`: El usuario visualiza y puede modificar su informacion basica
- `Turnos`: Como paciente podra solicitar y ver sus turnos. Como especialista podra editar su horario de atencion y ver sus turnos
- `Usuarios`: Como admin podra ver todos los usuarios registrados, asi como crear nuevas cuentas y habilitar o deshabilitar cuentas de especialistas 
- `Historial medico`: El paciente podra ver y descargar sus historiales medicos de consultas previas. El especialista podra cargar nuevas historias medicas al finalizar un turno

## Configuraciones

Se deberan cargar las claver privadas de firebase y de google captcha en los dos de la carpeta 'environments', con el siguiente formato:

```typescript
environment = {
    firebase:{
        "projectId": "",
        "appId": ":",
        "databaseURL": "",
        "storageBucket": "",
        "locationId": "",
        "apiKey": "",
        "authDomain": "",
        "messagingSenderId": ""
      },
      captchaGoogle:{
        passwordWeb: "",
        secretPassword:""
    }
};
```

Luego de cargar estos datos de debera ejecutar los comandos :
- `npm install`: Para instalar todos los paquetes npm
- `npm ng serve -o`: Para levantar el proyecto de forma local en su navegador

Si se desea subir el proyecto al hosting de firebase debe rear una cuenta en firebase, crear un proyecto y habilitar el hosting, luego ejecutar los comando:
- `npm install -g firebase-tools`: Para instalar el CLI de firebase de forma global (si no se desea instalar de forma global eleiminar el '-g')
- `firebase init`: Seleccionando la opcion de hosting
- `firebase deploy`: Para subir el proyecto al hosting (se detectara automaticamente el proyecto de angular). 
 
# Paginas
### Login
<span>Pagina de inicio de la app, donde se puden logear todos los tipos de usuario</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-1.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/login-1.JPG)</span>

## Registro
### Seleccion
<span>Primera pagina de registro, en esta pagina se selecciona que tipo de registro se creara</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/registro-1.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/registro-1.JPG)</span>

### Paciente
<span>Formulario de registro de un paciente, cargar todos los campos del formulario y cargar una obra social (Opcionalmente se puede crear nuevas obras sociales)</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/registro-3.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/registro-3.JPG)</span>

### Especialista

<span>Formulario de registro para un especialista, cargar todos los campos del formulario y cargar todos las especialidades que este tiene (Opcionalmente se pueden crear nuevas especialidades)</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/registro-2.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/registro-2.JPG)</span>

# Paciente
## Home
<span>Home de los pacientes logeados, en esta pagina se puede acceder al perfil del usuario, se puede sacar un turno y se pueden ver todos sus turnos asignados</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/paciente-1.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/paciente-1.JPG)</span>

## perfil

<span>Perfil del paciente, en esta pagina el paciente puede cambiar su datos personales, su obra social y visualizar su historial medico. (Al cliquear en una especialidad esta se selecciona para sacar un nuevo turno)</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/paciente-2.PNG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/paciente-2.PNG)</span>

<span>Al presionar el boton editar apareceran las obras sociales cargadas en el sistema donde se debera cliquear alguna para cambiarla (tambien se pueden crear nuevas obras sociales)</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/paciente-3.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/paciente-3.JPG)</span>

## Solicitar turnos
### Seleccion de especialidad

<span>Se mostraran todas las especialidades para crear un turno con la seleccionada</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-3.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-3.JPG)</span>

### Seleccion de especialista

<span>Se mostraran todos los especialistas, para crear un turno con el seleccionado</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-4.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-4.JPG)</span>

### Dias disponibles

<span>Luego de seleccionar un especialista se permitira seleccionar el dia que el pacietnte desea asistir al turno</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-5.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-5.JPG)</span>

### Horarios disponibles

<span>Luego de seleccionar un dia se le mostrara al paciente todos los horarios disponibles. Cada turno tiene una duracion de 30 minutos</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-6.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-6.JPG)</span>

## Mis turnos
### turnos pendientes

<span>Luego de realizar un turno el paciente puede ver todos sus turnos y cancelar los que aun no hueron aceptados por el especialista. Si el paciente cancela el turno debera dejar un comentario indicando la razon</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turnos.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turnos.JPG)</span>

### Calificacion de turno

<span>Luego que el especialista finalice el turno el usuario podra ver el comentario cargado del mismo y podra valorar con una puntuacion del 1 al 5 la atencion general recibida</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turno-calificar.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turno-calificar.JPG)</span>

### Generar encuesta

<span>Luego de calificar el turno se habilitara un boton para completar una encuesta con datos mas especificos sobre el turno</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/encuesta.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/encuesta.JPG)</span>

## filtros
<span>Se pueden filtrar por el especialista a cargo del turno</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-13.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-13.JPG)</span>

<span>Se puede filtrar por la especialidad seleccionada</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-12.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-12.JPG)</span>


# Especialista
## Home

<span>Home de los especialistas logeados, en esta pagina se puede acceder a su perfil, se pueden ver todos sus turnos asignados y se podran ver a todos los pacientes que atendio al menos una vez</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-1.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-1.JPG)</span>

## Perfil

<span>El especialista podra ver todos sus datos incluyendo los horarios de atencion que este tiene</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-2.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-2.JPG)</span>

<span>AL cliquear el boton editar se habilitara la edicion de sus datos y se mostraran todas las especialidades que hay para que este pueda agregar o eliminar especialidades que domina</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-3.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-3.JPG)</span>

## Mis turno
### Turnos Pendientes

<span>El especialista podra ver todos sus turnos y aceptar o rechazar los turnos pendientes. Si decide rechazar un turno este debera indicar el motivo de la cancelacion</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turnos-pendientes.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turnos-pendientes.JPG)</span>

### Turnos Aceptados

<span>Luego de aceptar el turno el especialista podra finalizarlo, indicando que el paciente fue atendido o podra cancelarlo indicando que no va a atender al paciente. En cualquiera de los dos casis el especialista debera cargar un comentario indicando la razon de su accion </span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turno-finalizado.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/turno-finalizado.JPG)</span>

## Mis pacientes
### Lista de pacientes

<span>Se mostraran todos los pacientes que fueron atendidos al menos una vez por este especialista, donde luego podra seleccionar uno para ver sus historiales medicos </span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-7.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-7.JPG)</span>

### Historiales del paciente

<span>Al seleccionar un paciente el especialista podra ver los historiales medicos que el cargo para ese paciente. El mismo podra ver la descripcion del historial y descargar un pdf del mismo</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-8.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/especialista-8.JPG)</span>

# Administrados

## Home

<span>Home de los aministradoes logeados, en esta pagina se puede acceder a su perfil, tendra la opcion de ver todos los usuarios logeados del sistema, podra ver todos los turnos del sistema y podra generar un nuevo turno indicando la especialidad, especialista y paciente (similar a la seccion del paciente)</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-1.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-1.JPG)</span>

## Perfil

<span>Podra ver y modificar sus datos basicos</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-1.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-2.JPG)</span>

## Usuarios
### Lista de usuarios

<span>Podra visualizar todos los usuarios registrados, como tambien negarle o permitirle el acceso a los usuarios especialistas y tambien podra crear nuevos usuarios. Esta es la unica parte de la aplicacion donde se podran crear nuevos usuarios administradores</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-7.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin-7.JPG)</span>

### Registro

<p> El registro de especialistas y pacientes es exactamente igual al registro que aparece al inicio de la aplicacion</p>

<span>Formulario para registrar un administrador</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin10.JPG](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/admin10.JPG)</span>

## Ejemplo de historial medico

<span>Forma del archivo pdf del historial medico</span><span>![https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/historial.png](https://github.com/gabriel-remon/clinica_online/blob/main/src/assets/pantalla/historial.png)</span>