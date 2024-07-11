import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() pathRegistro!:string;
  @Input() pathExito!:string;
  @Input() usuario!:any;


  mostrarPassword:boolean = false

  toast = inject(ToastrService)
  spinner = inject(NgxSpinnerService)
  authFirebase = inject(AuthService)
  utilsSvc = inject(UtilService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  async submit() {

    this.spinner.show();
    await this.authFirebase.login(this.form.value.email!, this.form.value.password!, () => {
     
      this.utilsSvc.goto(this.pathExito)
    },()=>{this.spinner.hide();})

    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"
  }

  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      const usuario = changes['usuario'].currentValue;
      this.form.controls.email.setValue(usuario.email, { emitEvent: false });
      this.form.controls.password.setValue(usuario.password, { emitEvent: false });
    }
  }
}
