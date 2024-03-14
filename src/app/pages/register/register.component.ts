import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  host: {
    '[class]': "'auth'",
  }
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  msg = '';

  registerForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.min(4)]],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    this.auth.register(
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.username.value
    ).subscribe(msg => this.msg = msg)
  }
}
