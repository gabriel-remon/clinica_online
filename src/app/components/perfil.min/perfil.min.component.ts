import { Component, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-perfil-min',
  standalone: true,
  imports: [],
  templateUrl: './perfil.min.component.html',
  styleUrl: './perfil.min.component.css'
})
export class PerfilMinComponent {

  utilSvc = inject(UtilService)
  authSvc = inject(AuthService)
  userLogin !:User


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      
    }, 400);
    
    if(this.authSvc.userLogin){

      this.userLogin=this.authSvc.userLogin
    }

    this.authSvc.user$.subscribe(data=>{
      this.userLogin=data
      console.log(this.userLogin.especialidades)
    })
  }
}
