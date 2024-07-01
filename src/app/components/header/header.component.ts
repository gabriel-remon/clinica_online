import { Component, inject } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { AuthService } from '../../core/services/auth.service';
import { updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  utilsSvc = inject(UtilService)
  athSvc = inject(AuthService)

  ngOnInit(): void {
  
  }
}
