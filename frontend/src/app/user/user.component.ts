import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/user.service';
import { User } from '../shared/types';
import { AlertComponent } from '../shared/alert/alert.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AlertComponent, ProfileCardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  status!: 'success' | 'fail' | 'inProgress';

  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.status = 'inProgress';
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.status = 'success';
          this.user = data as User;
        },
        error: () => {
          this.status = 'fail';
        }
      });
    })
  }

}
