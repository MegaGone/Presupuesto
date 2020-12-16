import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemModel } from '../models/item.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private url: string = 'https://yourbudgeteasy-default-rtdb.firebaseio.com';

    constructor(private _http: HttpClient) {

    }

    addItem(item: ItemModel) {
        return this._http.post(`${this.url}/items.json`, item);
    }

}