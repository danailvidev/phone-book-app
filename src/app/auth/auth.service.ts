import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
    this.user$ = this.afAuth.authState;
  }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => this.router.navigate([`/contacts`]))
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut();
    console.log('logout');
    this.router.navigate([`/about`]);
  }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then(_ => this.router.navigate([`/contacts`]))
      .catch(error => console.log(error));
  }

}
