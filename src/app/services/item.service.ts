import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ItemModel2 } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private url = 'https://yourbudgeteasy-default-rtdb.firebaseio.com';
    public userID: string;
    public items: AngularFireList<ItemModel2[]> = null;

    constructor(private http: HttpClient, private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            if (user) this.userID = user.uid
        })

        //this.getAllData();

    }

    // Fixed Items
    addItemFixed(item: ItemModel2) {
        return this.http.post(`${this.url}/fixed/${this.userID}.json`, item);
    }

    getFixedItems(id: string) {
        return this.http.get(`${this.url}/fixed/${id}.json`)
            .pipe(
                map(this.mapItems),
                delay(100)
            );
    }

    deleteItemFixed(id: string, itemId: string) {
        return this.http.delete(`${this.url}/fixed/${id}/${itemId}.json`);
    }

    // Normal items
    addItem(item: ItemModel2) {
        return this.http.post(`${this.url}/items/${this.userID}.json`, item);
    }

    getAllData() {
        return this.afDb.list<ItemModel2[]>(`items`).valueChanges().subscribe((res) => console.log(res));
    }

    getItem(id: string) {
        return this.http.get(`${this.url}/items/${id}.json`)
            .pipe(
                map(this.mapItems),
                delay(100)
            );
    }


    deleteItem(id: string, Itemid: string) {
        // elimiar desde firebase basado en el id
        return this.http.delete(`${this.url}/items/${id}/${Itemid}.json`);
    }

    // Convertir a un objeto la informacion
    private mapItems(itemsObj: object) {
        // transformar item de firebase al frontend
        const items: ItemModel2[] = [];

        if (itemsObj === null) { return items; }

        Object.keys(itemsObj).forEach(key => {

            items.push({
                id: key,
                name: itemsObj[key].name,
                cost: itemsObj[key].cost,
                date: itemsObj[key].date,
            });
        });
        //console.log('data transformed', items);

        return items;
    }
}