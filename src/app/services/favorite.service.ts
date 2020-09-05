import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** Models */
import { Dish } from '../shared/interfaces/Dish';

/** Services */
import { DishService } from '../services/dish.service';

/** ReactiveX Library */
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/** Static Data */
import { FAVORITES } from '../shared/data/favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
    /** Atributes */
    favorites: Array<any> = null;

    constructor(
        private http: HttpClient,
        private dishService: DishService
    ) { 
        console .log( 'Hello FavoriteService Service', this .favorites );
        

        this .getIdsFavoriteDishes() 
            .subscribe( data => {
                this .favorites = data;
            });

        console .log( 'Hello FavoriteService Service', this .favorites );
    }

    /** Get IDs of favorite dishes */
    getIdsFavoriteDishes(): Observable< number[] > {
        return of( FAVORITES );     // Create an Observable: Converts the arguments to an observable sequence.
    }

    /** Add a Favorite Dish */
    addFavorite( id: number ): boolean {
        if( ! this .isFavorite( id ) ) {
            this .favorites .push( id );
        }
        console .log( 'addFavorite', this .favorites );

        return true;
    }

    /** Check if the dish ID is favorite */
    isFavorite( id: number ): boolean {
        return this .favorites .some( indexValue => indexValue === id );        //  Checks if at least one element of the array meets the condition
    }

    /** Gets all the favorite dishes */
    getFavorites() {
        return this .dishService .getDishes()
                .pipe(
                    map( dishes => dishes .filter( dish => this .isFavorite( dish .id ) ) )     //  Map each registered dish and filter the first one that has an id included in the list of favorite dishes
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
