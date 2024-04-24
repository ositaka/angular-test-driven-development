import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styles: `span { cursor: pointer; }`
})
export class NavbarComponent {

  constructor(
    readonly authenticationService: AuthenticationService) {

  }

  logout() {
    this.authenticationService.logout();
  }
}
