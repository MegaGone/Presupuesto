import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { faUserCog, faBookmark, faHandHoldingUsd, faEdit, faTrash, faSpinner, faTintSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemModel2 } from '../../models/item.model';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService, ItemService]
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
  faTrash = faTrash;
  faSpinner = faSpinner;

  // Auth & info
  public loading: boolean = false;
  public user;
  public userID: string;
  public itemID;
  public nameItemValue: string = '';
  public data: any = 0;

  public item: ItemModel2 = {
    id: "0",
    name: '',
    cost: null,  
    date: new Date()
  };

  // Total cost
  public totalFixed = 0;
  public totalNormal = 0;

  // Length of the arrays
  public normal: number = 0;
  public fixed: number = 0;

  // Arrays for items
  public elements: ItemModel2[] = [];
  public itemsfixeds: ItemModel2[] = [];

  constructor(private afAuthSvc: AuthService, private router: Router, private itemSvc: ItemService, private dataSvc: DataService) {

    this.afAuthSvc.afAuth.authState.subscribe(user => {
      if (user) this.userID = user.uid
    });
  }

  async ngOnInit() {
    this.loading = true;
    this.user = await this.afAuthSvc.getCurrentUser();
    this.getUserData();
    this.getUserItems();
    this.getItemsFixed();

  }


  getUserData() {
    this.dataSvc.getSalary(this.userID).subscribe(res => this.data = res)
  }

  logOut() {
    this.afAuthSvc.logOut();
    this.router.navigate(["/"]);
  }

  // Normal Items
  addExpense(form) {

    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid item, try again please.'
      })
      return;
    };

    // Nueva validacion
    if (this.item.cost >= 1) {
      if (this.item.cost <= this.data) {
        this.itemSvc.addItem(this.item).subscribe(res => {
          this.getUserItems();
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
          text: `Your item cant be greather than Q ${this.data}`,
          showConfirmButton: false,
          timer: 1500
        })
      };

      // Greater than 0
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

      // SweetAlert lleva una promesa
      if (res.value) {

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your item was deleted',
          showConfirmButton: false,
          timer: 1500
        });
        this.elements.splice(i, 1);
        this.itemSvc.deleteItem(this.userID, id).subscribe(res => {
          this.getUserItems();
        });
      }
    })
  };

  // Normal Item
  getUserItems() {

    this.itemSvc.getItem(this.userID).subscribe(res => {
      let normal = 0;
      this.elements = res;

      this.elements.forEach((item) => {
        normal += item.cost;
      });

      this.totalNormal = normal;
      this.normal = this.elements.length;
      this.loading = false;;
    });
  };

  // Fixed Item
  getItemsFixed() {
    this.itemSvc.getFixedItems(this.userID).subscribe(res => {

      let fixed = 0;
      this.itemsfixeds = res;

      this.itemsfixeds.forEach(item => {
        fixed += item.cost;
      })

      this.totalFixed = fixed;
      this.fixed = this.itemsfixeds.length;
    });
  };
}