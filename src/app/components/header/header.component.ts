import { Component, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { AuthService } from '../../core/services/auth.service';
import { updateProfile } from '@angular/fire/auth';
import { User } from '../../core/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  utilsSvc = inject(UtilService)
  athSvc = inject(AuthService)
  spinnerSvc = inject(NgxSpinnerService)
  usuarioLogin!:User


  ngOnInit(): void {
    if(this.athSvc.userLogin){
      this.usuarioLogin = this.athSvc.userLogin
    }else{
      this.spinnerSvc.show()
    }
    this.athSvc.user$.subscribe(data=>{
      this.spinnerSvc.hide()
      this.usuarioLogin = data

    })
  }
}
