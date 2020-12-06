import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  public user;

  constructor(private afAuthSvc: AuthService) { }

  async ngOnInit() {
    console.log('Home works');
    this.user = await this.afAuthSvc.getCurrentUser();

    if (this.user) {
      console.log('User->', this.user);
      
    }
  }

}