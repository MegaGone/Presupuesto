import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AuthService]
})
export class SettingsComponent implements OnInit {

  constructor(private afAuthSvc: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }
}