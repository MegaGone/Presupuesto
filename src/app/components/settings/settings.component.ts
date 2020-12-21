import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
  public data: {} = {};
  public userDate;
  public userData;
  public userSalary: number;
  public date: any;
  public salary: any;
  public s: any;
  public d: any;

  async ngOnInit() {
    this.user = await this.afAuthSvc.getCurrentUser();
    this.getUserData();
  }

  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }


  saveChanges(form: NgForm) {

    if (form.invalid) {
      console.log('Not add');
      return;
    }

    this.dataService.setUserData(form, this.userData, this.date, this.salary)
    alert('Save');
  }

  addExpense(form) {
    if (form.invalid) {
      console.log("Not add");
      return;
    }

    console.log(form);
    form.reset();
  }

  getUserData() {
    const data = this.dataService.getUserData()
    this.form.setValue({
      salary: data.salary,
      date: data.date
    })
    this.s = data.salary;
    this.d = data.date;
  }
}