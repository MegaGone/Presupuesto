import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {
  faUserCog = faUserCog;

  public user;

  constructor(private afAuthSvc: AuthService, private router: Router) { }

  async ngOnInit() {
    console.log('Home works');
    this.user = await this.afAuthSvc.getCurrentUser();

    if (this.user) {
      console.log('User->', this.user);

    }
  }

  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }

}