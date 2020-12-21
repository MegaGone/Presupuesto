import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  setUserData(form, user, date, salary) {
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