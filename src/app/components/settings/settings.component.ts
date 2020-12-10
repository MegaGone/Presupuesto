import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AuthService]
})
export class SettingsComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  constructor(private afAuthSvc: AuthService, public router: Router) { }

  public user;

  async ngOnInit() {
    this.user = await this.afAuthSvc.getCurrentUser();

    if(this.user){
      console.log('User->', this.user);
      
    }
  }



  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }
}