import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** Models */
import { Dish } from '../shared/interfaces/Dish';

/** Services */
import { DishService } from '../services/dish.service';

/** ReactiveX Library */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
    /** Atributes */
    favorites: Array<number>;

    constructor(
        private http: HttpClient,
        private dishService: DishService
    ) { 
        this .favorites = [];
        console .log( 'Hello FavoriteService Service' );
    }

    /** Add a Favorite Dish */
    addFavorite( id: number ): boolean {
        if( ! this .isFavorite( id ) ) {
            this .favorites .push( id );
        }
        console .log( 'favorites', this .favorites );

        return true;
    }

    /** Check if the dish ID is favorite */
    isFavorite( id: number ): boolean {
        return this .favorites .some( indexValue => indexValue === id );        //  Checks if at least one element of the array meets the condition
    }

    /** Gets all the favorite dishes */
    getFavorites(): Observable< Dish[] > {
        return this .dishService .getDishes()   //  Get all registered dishes
                    .pipe(
                        map( dishes => dishes .filter( dish => this .favorites .some( indexValue => indexValue === dish .id ) ) )   //  Map each registered dish and filter the first one that has an id included in the list of favorite dishes
                    );
    }

    /** Remove an ID from the list of favorite dishes */
    deleteFavorite( id: number ): Observable< Dish[] > {
        let index = this .favorites .indexOf( id );     //  Returns the first index at which a given element can be found

        if( index >= 0 ) {
            this .favorites .splice( index, 1 );        //  Remove an element from the "index" index of the Favorites Array
            return this .getFavorites();
        }
        else {
            console .log( 'Deleting non-existant favorite', id );
            return Observable .throw( `Deleting non-existant favorite ${ id }` );
        }
    }

}
