import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  setUserData(form, user, date, salary){
    user = form.value;
    date = form.value.date;
    salary = form.value.salary;

    localStorage.setItem("date", date);
    localStorage.setItem("salary", salary);
  }  
}