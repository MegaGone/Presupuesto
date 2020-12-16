import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AuthService, DataService]
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

  constructor(private afAuthSvc: AuthService, public router: Router, private dataService: DataService) {
  }

  public user;
  public userData;
  public userDate;
  public userSalary;
  public date: any;
  public salary: any;

  async ngOnInit() {
    this.user = await this.afAuthSvc.getCurrentUser();
    this.userDate = localStorage.getItem("date");
    this.userSalary = localStorage.getItem("salary");
  }

  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }

  saveChanges(form: NgForm) {
    this.dataService.setUserData(form, this.userData, this.date, this.salary)
    alert('Save');
  }

  addExpense(form) {

    if(form.invalid){
      console.log("Not add");
      return;
    }

    alert('Add');
    form.reset();
  }
}