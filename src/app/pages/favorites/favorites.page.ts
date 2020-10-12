import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, LoadingController, AlertController } from '@ionic/angular';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';

/** Services */
import { FavoriteService } from '../../services/favorite.service';
import { DishService } from '../../services/dish.service';

/** ReactiveX Library */
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
    /** Atributes */
    favorites: Dish[] = [];
    idsFavorites: number[] = [];
    errorMessage: string;

    constructor(
        private router: Router,
        private favoriteService: FavoriteService,
        private dishService: DishService,
        public toastController: ToastController,   
        public loadingController: LoadingController,  
        public alertController: AlertController,   
        @Inject( 'BaseURL' ) private BaseURL
    ) { 
        console .log( 'BaseURL', this .BaseURL );
        this .checkDataToDisplay();
    }

    async checkDataToDisplay() {
        await this .getIdsFavoriteDishes();
        await this .getFavoriteDishes();
    }

    /** Gets all the favorite dishes */
    getIdsFavoriteDishes() {

        this .favoriteService 
            .checkStorage()
            .then( data => {
                console .log( 'Ids', data );
                this .idsFavorites = data;
            });
    }
    
    getFavoriteDishes() {

        this .dishService 
            .getDishes()
            .pipe(
                map( dishes => {
                    console .log( 'Dishes', dishes );
                    return dishes .filter( dish => this .idsFavorites .some( indexValue => indexValue == dish .id ) );
                })     //  Map each registered dish and filter the first one that has an id included in the list of favorite dishes
            )
            .subscribe( data => {
                console .log( 'getIdsFavoriteDishes', data );
                this .favorites = data;
            });

    }

    async deleteFavorite( id: number ) {
        console .log( 'deleteFavorite', id );

        /** Define Alert */
        const alert = await this .alertController .create({
            cssClass: 'ion-alert-delete-favorite',
            header: 'Confirm Delete!',
            message: `Do you want to <strong>delete</strong> Dish ${ id }?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: ( blah ) => {
                        console .log( 'Delete Cancelled!' );
                    }
                }, 
                {
                    text: 'Ok, Delete',
                    handler: async () => {
                        console .log( 'Confirm Okay' );

                        /** Define Loading */
                        const loading = await this .loadingController .create({
                            cssClass: 'ion-loading-delete-favorite',
                            message: 'Deleting...',
                            duration: 2000
                        });

                        await loading .present();

                        /** Define Toast */
                        const toast = await this .toastController .create({
                            message: `Dish ${ id } deleted successfully`,
                            duration: 3000
                        });

                        /** Using the Service to remove a dish from the favorites list */
                        this .favoriteService 
                            .deleteFavorite( id ) 
                            .then( data => {
                                if( data ) {
                                    console .log( 'deleteFavorite', data );
                                    this .checkDataToDisplay();
                                }
                            });

                    }   // handler
                }
            ]
        });
      
        await alert .present();

    }

    dishSelected( event, dish: Dish ) {
        const dishObjectString = JSON .stringify( dish );       // Convert Object to String
        
        console .log( 'dishSelected', dish );
        this .router .navigate( [ '/dish-detail' ], { queryParams: { dish: dishObjectString } } );
    }

}
