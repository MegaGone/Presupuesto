import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { faUserCog, faBookmark, faHandHoldingUsd, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemModel } from '../../models/item.model';
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

  public user;
  public salary: number | string = 0;
  public avaliable: number | string;
  public item = new ItemModel();
  public items: number = 0;

  constructor(private afAuthSvc: AuthService, private router: Router, private itemSvc: ItemService) {
    this.salary = localStorage.getItem("salary");
  }

  async ngOnInit() {
    this.user = await this.afAuthSvc.getCurrentUser();
    this.salary = localStorage.getItem("salary");
  }

  logOut() {
    this.afAuthSvc.logOut();
    console.log('LogOut');
    this.router.navigate(["/"]);
  }

  addExpense(form){
    if(form.invalid){
      return;
    }

    this.items++;
    alert('Add');
    form.reset();
  }
}