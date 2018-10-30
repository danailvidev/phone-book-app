import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  theme: string;
  themes = [
    { value: 'default-theme', label: 'Default' },
    { value: 'light-theme', label: 'Light' },
    { value: 'black-theme', label: 'Black' }
  ];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getThemeFromLocalStorage();
  }

  getThemeFromLocalStorage() {
    if (this.localStorageService.getItem('theme') != null) {
      this.theme = this.localStorageService.getItem('theme');
    } else {
      this.theme = 'default-theme';
    }
  }

  setTheme(event) {
    this.localStorageService.setItem('theme', event.value);
  }
}
