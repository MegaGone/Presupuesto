import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ItemService } from 'src/app/services/item.service';
import { ItemModel2 } from 'src/app/models/item.model';
import { userDataModel } from 'src/app/models/data.model';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AuthService, DataService]
})
export class SettingsComponent implements OnInit {

  form = new FormGroup({
    salary: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
  });

  fixed = new FormGroup({
    name: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required)
  })

  faArrowLeft = faArrowLeft;
  faTrash = faTrash;

  public item: ItemModel2 = {
    id: '0',
    name: '',
    cost: 0,
    date: new Date()
  };

  // New
  public data2: userDataModel = {
    salary: 0,
    cutOffDate: 0
  };

  // User info & auth
  public alldata: any;
  public user;
  public s: any;
  public d: any;
  public userID;

  //UI
  public items: ItemModel2[] = [];
  public loading: boolean = false;

  constructor(
    private afAuthSvc: AuthService,
    public router: Router,
    private dataService: DataService,
    private itemSvc: ItemService,) {

    this.afAuthSvc.afAuth.authState.subscribe(user => {
      this.userID = user.uid;
    })
  }

  async ngOnInit() {
    this.loading = true;
    this.user = await this.afAuthSvc.getCurrentUser();
    this.getData();
    this.getItems();
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

    if (this.userID) {
      this.dataService.uptadeData(this.userID, this.data2).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Update',
          text: 'Your configuration was update :)',
          timer: 2000,
          showConfirmButton: false
        });
      });

    }
  }

  addExpense(form) {
    let salario = parseInt(localStorage.getItem("salary"));

    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid item, try again please.',
        showConfirmButton: false,
        timer: 1500
      })
      form.reset();
      return;
    }

    if (this.item.cost >= 1) {

      if (this.item.cost <= salario) {
        this.itemSvc.addItemFixed(this.item).subscribe(res => {
          this.getItems();
        })
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your item was saved.',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid item, try again please.',
          showConfirmButton: false,
          timer: 1500
        });
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid item, try to enter a number greater than 0.',
        showConfirmButton: false,
        timer: 1500
      });
    }

    form.reset();
  }

  deleteItem(id: string, i: number) {

    Swal.fire({
      icon: 'question',
      title: 'Warning',
      text: `Are you sure to delete this item?`,
      showCancelButton: true,
      showConfirmButton: true,
    }).then(res => {

      if (res.value) {

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your item was deleted',
          timer: 1500,
          showConfirmButton: false
        });

        this.items.splice(i, 1);
        this.itemSvc.deleteItemFixed(this.userID, id).subscribe(res => {
          this.getItems();
        })
      }

    })
  }

  getItems() {
    this.itemSvc.getFixedItems(this.userID).subscribe(res => {
      this.items = res;
      this.loading = false
    })
  };

  getData() {
    this.dataService.getData(this.userID).subscribe(res => {
      this.alldata = res;
      this.form.setValue({
        salary: this.alldata.salary,
        date: this.alldata.cutOffDate
      });
      this.s = this.alldata.salary;
      this.d = this.alldata.cutOffDate
    });
  }
}