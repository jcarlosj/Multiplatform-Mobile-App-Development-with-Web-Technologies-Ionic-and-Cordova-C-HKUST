import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, LoadingController, AlertController } from '@ionic/angular';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';

/** Services */
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
    /** Atributes */
    favorites: Dish[];
    errorMessage: string;

    constructor(
        private router: Router,
        private favoriteService: FavoriteService,
        public toastController: ToastController,   
        public loadingController: LoadingController,  
        public alertController: AlertController,   
        @Inject( 'BaseURL' ) private BaseURL
    ) { 
        console .log( 'BaseURL', this .BaseURL );
    }

    ngOnInit() {
        this .favoriteService .getFavorites()
                .subscribe(
                    favorites => { 
                        this .favorites = favorites
                        console .log( 'Favorite Dishes', this .favorites );
                    },
                    error => this .errorMessage = <any> error
                );
               
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
                        this .favoriteService .deleteFavorite( id )
                                .subscribe( 
                                    favorites => {
                                        this .favorites = favorites;
                                        loading .dismiss();
                                        toast .present();
                                    },
                                    error => {
                                        this .errorMessage = error;
                                        loading .dismiss();
                                    } 
                                );

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
