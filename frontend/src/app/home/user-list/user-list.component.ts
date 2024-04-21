import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { UserPage } from '../../shared/types';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(pageNumber: number = 0) {
    this.userService.loadUsers(pageNumber).subscribe(responseBody => {
      this.page = responseBody as UserPage;
    })
  }

  get hasNextPage() {
    const { page, totalPages } = this.page;
    return totalPages > page + 1;
  }

  get hasPreviousPage() {
    return this.page.page != 0;
  }
}
