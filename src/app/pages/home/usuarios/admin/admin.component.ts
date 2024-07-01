import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../../../components/form.register/form.register.component';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormRegisterComponent,HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
