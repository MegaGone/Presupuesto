import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AuthService]
})
export class SettingsComponent implements OnInit {

  form = new FormGroup({
    salary: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  fixed = new FormGroup({
    name: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required)
  })

  faArrowLeft = faArrowLeft;

  constructor(private afAuthSvc: AuthService, public router: Router) { }

  public user;

  async ngOnInit() {
    this.user = await this.afAuthSvc.getCurrentUser();
  }

  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }

  saveChanges(){
    alert('Save');
  }

  addExpense(form){
    alert('Add');
    form.reset();
  }
}