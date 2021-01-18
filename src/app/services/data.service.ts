import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDataModel } from '../models/data.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public salary;
  private url = 'https://yourbudgeteasy-default-rtdb.firebaseio.com';
  public userDataModel: userDataModel;

  constructor( private http: HttpClient ) { 
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


  createUserData(userID: string | number, data: userDataModel){
    return this.http.post(`${this.url}/userdata/${ userID }.json`, data);
  }

  uptadeData(userID: string | number, data: userDataModel){
    return this.http.put(`${this.url}/userdata/${ userID }.json`, data);
  }
}