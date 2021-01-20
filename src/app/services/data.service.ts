import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDataModel } from '../models/data.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'https://yourbudgeteasy-default-rtdb.firebaseio.com';
  public userDataModel: userDataModel;

  constructor(private http: HttpClient) {
  }

  uptadeData(userID: string | number, data: userDataModel) {
    return this.http.put(`${this.url}/userdata/${userID}.json`, data);
  }

  getData(user: string) {
    return this.http.get(`${this.url}/userdata/${user}.json`);
  }

  getSalary(user: string){
    return this.http.get(`${this.url}/userdata/${user}/salary.json`);
  }
}