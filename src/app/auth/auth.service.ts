import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public router: Router) { }


  // Login
  async googleLogin() {
    try {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    catch (err) { console.warn(err); }
  }

  // LogOut
  async logOut() {
    try {
      this.afAuth.signOut();
    }
    catch (err) {
      console.warn(err)
    }
  }

  //User
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}