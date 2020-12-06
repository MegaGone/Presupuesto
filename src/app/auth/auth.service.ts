import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async googleLogin() {
    try {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    catch (err) { console.warn(err); }
  }

  async logOut() {
    try {
      this.afAuth.signOut();
    }
    catch (err) {
      console.warn(err)
    }
  }

}