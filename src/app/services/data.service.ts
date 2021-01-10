import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public salary;

  constructor() { 
    this.salary = 0;
  }

  setUserData(form, user, date, salary) {
    date = 0;
    salary = 0;

    date = form.value.date;
    salary = form.value.salary;

    localStorage.setItem("date", date);
    localStorage.setItem("salary", salary);
  }

  getUserData() {
    const response = {
      date: parseInt(localStorage.getItem("date")),
      salary: parseInt(localStorage.getItem("salary")),
    }

    return response;
  }
}