import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AlertComponent, ButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  passwordRepeat = '';
  apiProgress = false;
  singUpSuccess = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { }

  onChageUsername(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }

  onChageEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  onChagePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  onChagePasswordRepeat(event: Event) {
    this.passwordRepeat = (event.target as HTMLInputElement).value;
  }

  onClickSignUp() {
    this.apiProgress = true;
    this.httpClient
      .post('/api/1.0/users', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe(() => {
        this.singUpSuccess = true;
      });
  }

  isDisabled() {
    return this.password ? this.password !== this.passwordRepeat : true;
  }
}
