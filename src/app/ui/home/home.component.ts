import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  anonymousLogin(): void {
    this.authService.anonymousLogin();
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
