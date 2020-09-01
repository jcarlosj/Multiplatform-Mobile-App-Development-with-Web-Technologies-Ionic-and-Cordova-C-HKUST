import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
    /** Atributes */
    favorites: Array<number>;

    constructor(
        private http: HttpClient
    ) { 
        this .favorites = [];
        console .log( 'Hello FavoriteService Service' );
    }

    addFavorite( id: number ): boolean {
        this .favorites .push( id );
        return true;
    }

    isFavorite( id: number ): boolean {
        return this .favorites .some( indexValue => indexValue === id );        //  Checks if at least one element of the array meets the condition
    }

}
