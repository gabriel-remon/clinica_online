import { Component, Input, inject } from '@angular/core';
import { Especialidad } from '../../core/models/especialidades.model';
import { ObraSocial } from '../../core/models/obra.social.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UtilService } from '../../core/services/util.service';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form.register.component.html',
  styleUrl: './form.register.component.css'
})
export class FormRegisterComponent {


  @Input() pathExito!: string;
  @Input() pathRegistro!: string;
  @Input() tipo!: "admin" | "especialista" | "paciente";
  @Input() datoIngreso!: Especialidad[]|ObraSocial;
  @Input() registro: boolean=false;

  toast = inject(ToastrService)
  spinner = inject(NgxSpinnerService)
  authFirebase = inject(AuthService)

  utilSvc = inject(UtilService)
  //dialog= inject(MatDialog)
  //dialogRef = inject(MatDialogRef<ConfirmPasswordComponent>)
  
  imagenPerfil:any;
  imagenPaciente:any;

  form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      nacimiento: new FormControl('', [Validators.required]),
      foto: new FormControl('', ),
      especialidad:new FormControl('', ),
      obra_social:new FormControl('', ),
      foto_paciente:new FormControl('', ),
    });
    

  ngOnInit(): void {
    
    this.cambioTipo()
    
  }

  ngOnChanges(): void {
    if(this.datoIngreso && this.tipo == 'especialista' ){
      this.form.controls.especialidad.setValue("a", { emitEvent: false });
    }
    if(this.datoIngreso && this.tipo == 'paciente'){
      this.form.controls.obra_social.setValue("a", { emitEvent: false });
    }
  }

  cambioTipo(){
    if(this.tipo == 'especialista'){
      this.eliminarValidadores('obra_social')
      this.eliminarValidadores('foto_paciente')
      this.agregarValidador('especialidad',Validators.required)
    }
    
    if(this.tipo == 'paciente'){
      this.eliminarValidadores('especialidad')
      this.agregarValidador('obra_social',Validators.required)
      this.agregarValidador('foto_paciente',Validators.required)
    }
  }

  agregarValidador(controlName: string, validator: any): void {
    const control = this.form.get(controlName);
    if (control) {
      const validators = control.validator ? [control.validator, validator] : [validator];
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  eliminarValidadores(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }

  cargarFotoPerfil(event:any){
    const file = event.target.files[0];
    if (file) {
      this.imagenPerfil = file
    }
  }
  cargarFotoPaciente(event:any){
    const file = event.target.files[0];
    if (file) {
      this.imagenPaciente = file
    }
  }

  async submit() {

    if(this.tipo!='admin' ){
      if(this.tipo=='especialista' && !this.datoIngreso){
        this.toast.error("Deve seleccionar unaobra social")
        return
      }
      
      //@ts-ignore
      if(this.tipo=='especialista' && (!this.datoIngreso||this.datoIngreso.length==0)){
        this.toast.error("Deve seleccionar por lo menos una especialidad")
        return
      }
    }

    let newUser:any = {
      email: this.form.value.email as string,
      nombre: this.form.value.nombre as string,
      apellido: this.form.value.apellido as string,
      dni: this.form.value.dni as string,
      fecha_nacimiento: this.form.value.nacimiento as string,
      rol: this.tipo,
      horario:null
    }
    if (this.tipo != "admin") {
      this.spinner.show();
      if (this.tipo == "especialista") {
        newUser = {
          ...newUser,
          especialidades: this.datoIngreso,
          especialista_valido: false
        } 

      }
       if (this.tipo == "paciente")  {
        newUser = {
          ...newUser,
          obra_social: this.datoIngreso
        } 
      }
      await this.authFirebase.register(newUser as User, this.form.value.password!,this.imagenPerfil,this.imagenPaciente).then(() => {
        if(this.pathExito){this.utilSvc.goto(this.pathExito)}
        this.toast.success("registro exitoso, verifique su casilla de mail para validadr la cuenta", "Registro")
      })
      this.spinner.hide();
    }else{
/*
      const dialogRef = this.dialog.open(ConfirmPasswordComponent, {
        width: '400px',
        height: '350px',
      });
      dialogRef.afterClosed().subscribe(passwordAdmin=>{
        this.spinner.show(); 
        this.authFirebase.registerAdmin(newUser as User,passwordAdmin, this.form.value.password!,this.imagenPerfil,() => {
          if(this.pathExito){this.utilSvc.goto(this.pathExito)}
          this.toast.success("registro exitoso, verifique su casilla de mail para validadr la cuenta", "Registro")
          this.spinner.hide();
        },()=>{
          this.spinner.hide();
        },this.imagenPaciente)
      } )


*/
      
    }


    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"
  }
}
