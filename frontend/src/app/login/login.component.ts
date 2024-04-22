import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../core/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  email = '';
  password = '';

  error = '';

  apiProgress = false;

  constructor(private userService: UserService) { }

  isDisabled() {
    return !this.email || !this.password;
  };

  onClickLogin() {
    this.apiProgress = true;
    this.userService.autheticate(this.email, this.password).subscribe({
      next: () => { },
      error: (err: HttpErrorResponse) => {
        this.error = err.error.message;
        this.apiProgress = false;
      },
    });
  }
}
