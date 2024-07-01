import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { BackComponent } from '../../../components/back/back.component';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BackComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  utilSvc = inject(UtilService)
}
