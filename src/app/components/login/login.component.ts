import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private afAuthSvc: AuthService) { }

  ngOnInit(): void {
  }

  googleLogin(){
    // Service
    try{
      this.afAuthSvc.googleLogin()
    }
    catch (err){console.log(err);
    }
    
  }

}