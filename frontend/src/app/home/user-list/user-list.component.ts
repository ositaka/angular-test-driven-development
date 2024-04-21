import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { UserPage } from '../../shared/types';
import { Router, RouterLink } from '@angular/router';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, UserListItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  page: UserPage = {
    content: [],
    page: 0,
    size: 3,
    totalPages: 0
  };

  fetchingData = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(pageNumber: number = 0) {
    this.fetchingData = true;
    this.userService.loadUsers(pageNumber).subscribe(responseBody => {
      this.page = responseBody as UserPage;
      this.fetchingData = false;
    })
  }

  get hasNextPage() {
    const { page, totalPages } = this.page;
    return totalPages > page + 1;
  }

  get hasPreviousPage() {
    return this.page.page != 0;
  }

  navigate(id: number) {
    this.router.navigate(['/user', id]);
  }
}
