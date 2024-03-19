import { Component, inject } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthPayload } from '../../models/auth-payload.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private auth = inject(AuthService);

  message = '';

  submit(user: AuthPayload) {
    this.message = '';
    this.auth.register(
      user.email,
      user.password,
      user.username!
    ).subscribe(message => {
      this.message = message
    })
  }
}
