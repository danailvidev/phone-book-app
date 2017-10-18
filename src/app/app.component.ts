import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navigation = [
    { link: 'home', label: 'Home' },
    { link: 'contacts', label: 'Contacts' },
    { link: 'settings', label: 'Settings' }
  ];
}
