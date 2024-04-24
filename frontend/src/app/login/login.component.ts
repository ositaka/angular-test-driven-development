import { Component, viewChild } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { FormControl, FormsModule } from '@angular/forms';
import { UserService } from '../core/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../shared/alert/alert.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { User } from '../shared/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, FormsModule, AlertComponent, JsonPipe, CommonModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  email = '';
  password = '';

  error = '';

  apiProgress = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authenthciationService: AuthenticationService) { }

  isDisabled() {
    return !this.email || !this.password;
  };

  onClickLogin() {
    this.apiProgress = true;
    this.userService.autheticate(this.email, this.password).subscribe({
      next: (body) => {
        this.router.navigate(['/']);
        this.authenthciationService.setLoggedInUser(body as User)
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error.message;
        this.apiProgress = false;
      },
    });
  }

  isInvalid(field: FormControl) {
    const { invalid, dirty, touched } = field;

    return invalid && (dirty || touched);
  }

  onChange() {
    this.error = '';
  }
}
