import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { faUserCog, faBookmark, faHandHoldingUsd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemModel2 } from '../../models/item.model';
import Swal from 'sweetalert2';
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

  public user;
  public salary: number = 0;
  public avaliable: number;
  public item: ItemModel2 = {
    id: "0",
    name: '',
    cost: 0,
    date: new Date()
  };
  public items: number;
  public userID: string;
  public itemID;

  public elements: ItemModel2[] = [];

  constructor(private afAuthSvc: AuthService, private router: Router, private itemSvc: ItemService) {

    this.afAuthSvc.afAuth.authState.subscribe(user => {
      if (user) this.userID = user.uid
    });

    this.salary = parseInt(localStorage.getItem("salary"));
    this.items = 0;
  }

  async ngOnInit() {
    this.user = await this.afAuthSvc.getCurrentUser();
    this.salary = parseInt(localStorage.getItem("salary"));
    this.getUserItems();
  }

  logOut() {
    this.afAuthSvc.logOut();
    this.router.navigate(["/"]);
  }

  addExpense(form) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error to add your item'
      })
      return;
    };

    if (this.item.cost <= this.salary) {
      this.itemSvc.addItem(this.item).subscribe(res => {
        //console.log(res);
        this.getUserItems();
      })
      Swal.fire({
        position: 'top',
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
      })
    };

    form.reset();
  }

  getUserItems() {
    this.itemSvc.getItem(this.userID).subscribe(res => {

      let total = 0;
      this.elements = res;
      this.elements.forEach((item) => {

        total += item.cost;
      });

      this.avaliable = this.salary - total;
      this.items = this.elements.length;

    });
  };


  deleteItem(id: string, i: number) {
    Swal.fire({
      icon: 'question',
      title: 'Warning',
      text: `Are you sure to delete this item?`,
      showCancelButton: true,
      showConfirmButton: true,
    }).then(res => {

      if (res.value) {
        this.elements.splice(i, 1);
        this.itemSvc.deleteItem(this.userID, id).subscribe();
      }
    })
  };

}