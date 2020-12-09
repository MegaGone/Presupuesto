import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public usuario: any = {};

  constructor(private afAuthSvc: AuthService, private router: Router) {

    this.afAuthSvc.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.router.navigate(['/home']);
    })
  }

  ngOnInit(): void {
  }

  async googleLogin() {
    // Service
    try {
      await this.afAuthSvc.googleLogin();
    }
    catch (err) {
      console.log(err);
    }

  }
}