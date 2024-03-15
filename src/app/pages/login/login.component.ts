import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    '[class]': "'auth'",
  }
})
export class LoginComponent {
  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  msg = '';

  loginForm = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    this.auth.login(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    ).subscribe(msg => {
      this.msg = msg
    })
  }
}