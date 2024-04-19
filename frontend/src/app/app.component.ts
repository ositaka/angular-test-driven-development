import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SignUpComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'source';
}
