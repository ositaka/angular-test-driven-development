import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { ButtonComponent } from '../shared/button/button.component';
import { UserService } from '../core/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, AlertComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)]),
    passwordRepeat: new FormControl(''),
  });

  apiProgress = false
  signUpSuccess = false

  constructor(private userSerivce: UserService) { }

  ngOnInit(): void { }

  get usernameError() {
    const field = this.form.get('username');

    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors['required']) {
        return 'Username is required';
      } else {
        return 'Username must be at least 4 characters long'
      }
    }
    return;
  }

  get emailError() {
    const field = this.form.get('email');

    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors['required']) {
        return 'E-mail is required';
      } else if (field.errors['email']) {
        return "Invalid e-mail address";
      }
    }
    return;
  }

  get passwordError() {
    const field = this.form.get('password');

    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors['required']) {
        return 'Password is required';
      } else if (field.errors['pattern']) {
        return 'Password must have at least one uppercase, 1 lowercase letter and 1 number';
      }
    }
    return;
  }

  onClickSignUp() {
    const body = this.form.value;

    delete body.passwordRepeat;

    this.apiProgress = true;
    // @ts-ignore
    this.userSerivce.signUp(body).subscribe(() => {
      this.signUpSuccess = true
    })
  }

  isDisabled() {
    return this.form.get('password')?.value
      ? this.form.get('password')?.value !== this.form.get('passwordRepeat')?.value
      : true;
  }
}
