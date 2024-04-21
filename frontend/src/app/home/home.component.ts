import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, first, map } from 'rxjs';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  subscriber?: Subscriber<string>;

  observable = new Observable<string>((sub) => {
    this.subscriber = sub;
  });

  message = "No message";

  constructor() { }

  ngOnInit(): void {
  }

  subscribe() {
    this.observable.pipe(map(value => '--------' + value + '--------')).subscribe(data => this.message = data);
    // this.observable.subscribe({
    //   next: (data) => {
    //     this.message = data;
    //   },
    //   complete: () => {
    //     this.message = "Completed";
    //   },
    //   error: (err) => {
    //     this.message = err.message;
    //   }
    // })
  }

  publish() {
    this.subscriber?.next("" + Math.random() * 100)
  }

  complete() {
    this.subscriber?.complete();
  }

  error() {
    this.subscriber?.error(new Error("Dummy error"));
  };

}
