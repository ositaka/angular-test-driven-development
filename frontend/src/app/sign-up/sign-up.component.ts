import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { ButtonComponent } from '../shared/button/button.component';
import { UserService } from '../core/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AlertComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl(''),
  });

  apiProgress = false
  signUpSuccess = false

  constructor(private userSerivce: UserService) { }

  ngOnInit(): void { }

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
