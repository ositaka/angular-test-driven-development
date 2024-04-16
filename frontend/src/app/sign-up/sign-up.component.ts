import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { ButtonComponent } from '../shared/button/button.component';
import { UserService } from '../core/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from './password-match.validator';
import { UniqueEmailValidator } from './unique-email.validator';
import { HttpErrorResponse } from '@angular/common/http';

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
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],
      updateOn: 'blur'
    }),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)]),
    passwordRepeat: new FormControl(''),
  }, {
    validators: passwordMatchValidator
  });

  apiProgress = false
  signUpSuccess = false

  constructor(private userSerivce: UserService, private uniqueEmailValidator: UniqueEmailValidator) { }

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
      } else if (field.errors['uniqueEmail']) {
        return "E-mail in use";
      } else if (field.errors['backend']) {
        return field.errors['backend'];
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

  get passwordRepeatError() {
    if (this.form?.errors && (this.form?.touched || this.form?.dirty)) {
      if (this.form.errors['passwordMatch']) {
        return 'Password ismatch';
      }
    }
    return;
  }

  onClickSignUp() {
    const body = this.form.value;
    delete body.passwordRepeat;
    this.apiProgress = true;
    // @ts-ignore
    this.userSerivce.signUp(body).subscribe({
      next: () => {
        this.signUpSuccess = true;
      },
      error: (httpError: HttpErrorResponse) => {
        const emailValidationErrorMessage = httpError.error.validationErrors.email;
        this.form.get('email')?.setErrors({ backend: emailValidationErrorMessage });
        this.apiProgress = false;
      }
    })
  }

  isDisabled() {
    const formFilled = this.form.get('username')?.value
      && this.form.get('email')?.value
      && this.form.get('password')?.value
      && this.form.get('passwordRepeat')?.value

    const validationError = this.usernameError || this.emailError || this.passwordError || this.passwordRepeatError;

    return !formFilled || validationError ? true : false;
  }
}
