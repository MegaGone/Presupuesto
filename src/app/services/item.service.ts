import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ItemModel2 } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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


    addItem(item: ItemModel2) {
        return this.http.post(`${this.url}/items/${this.userID}.json`, item);
    }

    getAllData() {
        return this.afDb.list<ItemModel2[]>(`items`).valueChanges().subscribe((res) => console.log(res));
    }

    getItem(id: string){
        //console.log(`${this.url}/items/${ id }`);
        
        return this.http.get(`${this.url}/items/${ id }.json`)
            .pipe( 
                map( this.mapItems )
            );
    }


    deleteItem(id: string,Itemid: string){
       // console.log('delete',Itemid); 
        // elimiar desde firebase basado en el id
        
        return this.http.delete(`${ this.url }/items/${ id }/${ Itemid }.json`);
    }

    // Convertir a un objeto la informacion
    private mapItems( itemsObj: object ){
        //console.log("raw data", itemsObj);
        // transformar item dl backend al frontend
        const items: ItemModel2[] = [];

        if( itemsObj === null ) { return items; }

        Object.keys(itemsObj).forEach(key => {
           
            items.push( {
                id: key,
                name: itemsObj[key].name,
                cost:itemsObj[key].cost,
                date: itemsObj[key].date,
            });
        });
        //console.log('data transformed', items);
        
        return items;
    }
}