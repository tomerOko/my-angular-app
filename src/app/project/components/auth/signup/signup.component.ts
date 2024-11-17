// src/app/components/auth/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserDm } from '../../../models/DMs/user.dm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid && this.passwordsMatch()) {
      const user: UserDm = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
      this.authService.signup(user).subscribe(
        () => {
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    } else if (!this.passwordsMatch()) {
      this.errorMessage = 'Passwords do not match.';
    }
  }

  passwordsMatch(): boolean {
    return (
      this.signupForm.value.password === this.signupForm.value.confirmPassword
    );
  }
}
