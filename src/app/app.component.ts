import { Component } from '@angular/core';
import { User } from 'src/app/web-components/card-user/user';
import { CardUser } from './web-components/card-user/card-user';

@Component({
  selector: 'corp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: User[] = [
    {
      id: 0,
      fullName: 'Luis Avilles',
      role: 'Software Engineer',
      avatar: 'https://luixaviles.com/images/avatar@2x.png',
    },
    {
      id: 1,
      fullName: 'Roberto Perez',
      role: 'UX Designer',
    },
    {
      id: 2,
      fullName: 'Maria Gomez',
      role: 'Data Scientist',
    },
  ];

  save(event: Event): void {
    const user = (event as CustomEvent<User>).detail;
    this.users.map((u) => {
      if (u.id === user.id) {
        u.fullName = user.fullName;
        u.role = user.role;
      }

      return u;
    });
  }

  remove(event: Event): void {
    const user = (event as CustomEvent<User>).detail;
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  constructor() {
    customElements.define('card-user', CardUser);
  }
}
