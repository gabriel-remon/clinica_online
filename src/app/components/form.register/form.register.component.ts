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
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { RechaptchaService } from '../../core/services/rechaptcha.service';
import { ageMaxValidator, ageMinValidator, dateNotInFutureValidator } from '../../core/validators/date.validators';
import { fileTypeValidator } from '../../core/validators/file.validator';
@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,
    RecaptchaModule,RecaptchaFormsModule],
  templateUrl: './form.register.component.html',
  styleUrl: './form.register.component.css'
})
export class FormRegisterComponent {


  @Input() pathExito!: string;
  @Input() pathRegistro!: string;
  @Input() tipo!: "admin" | "especialista" | "paciente";
  @Input() datoIngreso!: Especialidad[]|ObraSocial;
  @Input() registro: boolean=false;
  @Input() registroConAdmin: boolean=false;

  claveWeb:string=""
  toast = inject(ToastrService)
  spinner = inject(NgxSpinnerService)
  authFirebase = inject(AuthService)
  captchaSvc = inject(RechaptchaService)
  utilSvc = inject(UtilService)
  //dialog= inject(MatDialog)
  //dialogRef = inject(MatDialogRef<ConfirmPasswordComponent>)
  
  imagenPerfil:any;
  imagenPaciente:any;

  form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(60)]),
      nombre: new FormControl('', [Validators.required,Validators.maxLength(60),Validators.minLength(4)]),
      apellido: new FormControl('', [Validators.required,Validators.maxLength(60),Validators.minLength(4)]),
      dni: new FormControl('', [Validators.required,Validators.max(100000000)]),
      nacimiento: new FormControl('', [Validators.required,dateNotInFutureValidator(),ageMaxValidator(130)]),
      foto: new FormControl('',fileTypeValidator(['jpeg', 'png','jpg']) ),
      especialidad:new FormControl('', ),
      obra_social:new FormControl('', ),
        foto_paciente:new FormControl('', ),
        recaptchaReactive:new FormControl('',Validators.required)
    });
    

  ngOnInit(): void {
    this.claveWeb = environment.captchaGoogle.passwordWeb
    this.cambioTipo()
    
  }
  
  ngOnChanges(): void {
    if(this.datoIngreso && this.tipo == 'especialista' ){
      this.form.controls.nacimiento.addValidators([Validators.required,ageMinValidator(18)])
      this.form.controls.especialidad.setValue("a", { emitEvent: false });
    }
    if(this.datoIngreso && this.tipo == 'paciente'){
      this.form.controls.obra_social.setValue("a", { emitEvent: false });
      this.form.controls.foto_paciente.addValidators([Validators.required,fileTypeValidator(['image/jpeg', 'image/png'])])
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


  resolved(captchaResponse: any) {
    //console.log(captchaResponse);
    /*
    this.captchaSvc.validateRecaptcha(captchaResponse).subscribe(data=>{
      console.log(data.sus)
    })*/
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
      if(this.registroConAdmin){
        this.spinner.show();
        await this.authFirebase.registerAdmin(newUser as User, this.form.value.password!,this.imagenPerfil,()=>{
          this.toast.success("registro exitoso, verifique su casilla de mail para validadr la cuenta", "Registro")
          this.form.reset();
        },()=>{
          this.spinner.hide();
        },this.imagenPaciente)
      }else{

        await this.authFirebase.register(newUser as User, this.form.value.password!,this.imagenPerfil,this.imagenPaciente).then(() => {
          if(this.pathExito){this.utilSvc.goto(this.pathExito)}
          this.toast.success("registro exitoso, verifique su casilla de mail para validadr la cuenta", "Registro")
        })
        this.spinner.hide();
      }
   
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
    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"
  }
}
