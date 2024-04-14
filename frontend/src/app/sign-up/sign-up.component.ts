import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  passwordRepeat = '';

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
    // fetch('/api/1.0/users', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username: this.username,
    //     email: this.email,
    //     password: this.password,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    this.httpClient
      .post('/api/1.0/users', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe();
  }

  isDisabled(): boolean {
    return this.password ? this.password !== this.passwordRepeat : true;
  }
}
