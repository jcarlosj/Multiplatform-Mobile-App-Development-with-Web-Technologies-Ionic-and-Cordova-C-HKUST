import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';

/** Services */
import { FavoriteService } from '../../services/favorite.service';

/** ReactiveX Library */
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.page.html',
  styleUrls: ['./dish-detail.page.scss'],
})
export class DishDetailPage implements OnInit {
    /** Atributes */
    dish: Dish;
    errorMessage: string;
    avgStars: string;
    numComments: number;
    favorite: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private favoriteService: FavoriteService,
        public toastController: ToastController,
        @Inject( 'BaseURL' ) public BaseURL            // Mechanism for letting Angular know that a parameter must be injected
    ) { 
        console .log( 'BaseURL', this .BaseURL );
        
        this .activatedRoute .queryParams 
              .pipe(
                  map( ( data ) => {                              // Dish Object String
                      console. log( 'String', data );
                      return JSON .parse( data .dish );           // Convert String to Object
                  })
              )
              .subscribe( ( dish: Dish )  => {
                    this .dish = dish;                            // Dish Object Data
              });       
    }

    ngOnInit() {
        let total = 0;

        this .dish .comments .forEach( comment => total += comment .rating );   //  Add the total rating per dish comment 
        this .numComments = this .dish .comments .length;                       //  Count number of total comments of the dish
        this .avgStars = ( total / this .numComments ) .toFixed( 2 );           //  Calculate the average rating of the dish
        this .favorite = this .favoriteService .isFavorite( this .dish .id );   //  Assign a true or false value if the dish has been added as a favorite
        console .log( 'DishDetailPage', this .dish );
    }

    async addToFavorites() {
        console .log( 'Adding to Favorites', this .dish .id );
        this .favorite = this .favoriteService .addFavorite( this .dish .id );

        /** Define Toast */
        const toast = await this .toastController .create({
            message: `Dish ${ this .dish .id } added as favorite successfully`,
            position: 'middle',
            duration: 3000
        });

        toast .present();
    }

}
