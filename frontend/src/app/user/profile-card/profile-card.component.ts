import { Component, Input } from '@angular/core';
import { User } from '../../shared/types';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {

  @Input() user!: User;
}
