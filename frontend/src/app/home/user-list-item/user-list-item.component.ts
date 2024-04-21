import { Component, Input } from '@angular/core';
import { User } from '../../shared/types';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.css'
})
export class UserListItemComponent {

  @Input() user!: User;
}
