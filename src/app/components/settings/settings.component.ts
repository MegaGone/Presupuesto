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
    this.router.navigate(["/"]);
  }


  saveChanges(form: NgForm) {

    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error to save changes',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }

    this.dataService.setUserData(form, this.userData, this.date, this.salary)
    Swal.fire({
      icon: 'success',
      title: 'Update',
      text: 'Your changes was update :)',
      timer: 2000,
      showConfirmButton: false
    });
  }

  addExpense(form) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid item, try again please.',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your item was saved.',
      showConfirmButton: false,
      timer: 1500
    });

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