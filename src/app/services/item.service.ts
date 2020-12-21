import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ItemModel } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private url = 'https://yourbudgeteasy-default-rtdb.firebaseio.com';
    public userID: string;

    constructor(private http: HttpClient, private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            if (user) this.userID = user.uid
        })

        this.getItems();
    }


    addItem(item: ItemModel) {
        return this.http.post(`${this.url}/items/${this.userID}.json`, item);
    }

    getItems(){
        return this.afDb.list<ItemModel[]>('items').valueChanges().subscribe((res) => console.log(res));
    }
}