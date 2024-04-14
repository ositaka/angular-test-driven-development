import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { ButtonComponent } from '../shared/button/button.component';
import { UserService } from '../core/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AlertComponent, ButtonComponent, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  passwordRepeat = '';
  apiProgress = false;
  signUpSuccess = false;

  constructor(private userSerivce: UserService) { }

  ngOnInit(): void { }

  onClickSignUp() {
    this.apiProgress = true;
    this.userSerivce.signUp({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe(() => {
      this.signUpSuccess = true
    })
  }

  isDisabled() {
    return this.password ? this.password !== this.passwordRepeat : true;
  }
}
