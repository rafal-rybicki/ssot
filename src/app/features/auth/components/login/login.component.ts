import { Component, inject } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthPayload } from '../../models/auth-payload.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(AuthService);

  message = '';

  submit(user: AuthPayload) {
    this.message = '';
    this.auth.login(
      user.email!,
      user.password!
    ).subscribe(message => {
      this.message = message || '';
    })
  }
}