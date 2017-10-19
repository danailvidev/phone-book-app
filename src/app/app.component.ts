import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ContactService} from './core/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navigation = [
    { link: 'contacts', label: 'Contacts' }
  ];
  searchBtn = '';

  constructor(
    public authService: AuthService,
    public contactService: ContactService) {
  }
}
