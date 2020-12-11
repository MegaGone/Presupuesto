import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { faUserCog, faBookmark, faHandHoldingUsd, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})

export class HomeComponent implements OnInit {

  add = new FormGroup({
    name: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required)
  })

  faUserCog = faUserCog;
  faBookMark = faBookmark;
  faHandHoldingUsd = faHandHoldingUsd;
  faEdit = faEdit;

  public user;

  constructor(private afAuthSvc: AuthService, private router: Router) { }

  async ngOnInit() {
    console.log('Home works');
    this.user = await this.afAuthSvc.getCurrentUser();
  }

  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }

  addExpense(form) {
    alert('Add');
    form.reset();
  }
}