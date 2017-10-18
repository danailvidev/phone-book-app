import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navigation = [
    { link: 'contacts', label: 'Contacts' },
    { link: 'settings', label: 'Settings' }
  ];

  constructor(public authService: AuthService) {

  }
}
