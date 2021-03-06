import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';

/** Components */
import { CommentPage } from '../comment/comment.page';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';
import { Comment } from '../../shared/interfaces/Comment';

/** Services */
import { FavoriteService } from '../../services/favorite.service';
import { DishService } from '../../services/dish.service';

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
    dishCopy: Dish;
    newComment: Comment;
    errorMessage: string;
    avgStars: string;
    numComments: number;
    favorite: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private favoriteService: FavoriteService,
        private dishService: DishService,
        public toastController: ToastController,
        public actionSheetController: ActionSheetController,
        private modalController: ModalController,
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

        this .dishCopy = this .dish;
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

    async showActionSheet() {
        const actionSheet = await this .actionSheetController .create({
            header: 'Select Actions',
            cssClass: 'ion-action-sheet',
            buttons: [
                {
                    text: 'Add to Favorites',
                    icon: 'heart',
                    handler: () => {
                        console .log( 'Add to Favorites' );
                        this .addToFavorites();
                    }
                }, 
                {
                    text: 'Add Comment',
                    icon: 'chatbox-ellipses-outline',
                    handler: () => {
                        console .log( 'Add Comment' );
                        this .openModalComment();
                    }
                }, 
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console .log( 'Cancel clicked' );
                    }
                }
            ]
        });

        await actionSheet .present();

    }

    async openModalComment() {
        console .log( 'openModalComment' );

        const modal = await this .modalController .create({
            component: CommentPage
        });

        await modal .present();
        const { data } = await modal .onDidDismiss();

        this .dishCopy .comments .push( data );             // Add Comment

        let total = 0;

        this .dishCopy .comments .forEach( comment => total += comment .rating );   //  Add the total rating per dish comment 
        this .numComments = this .dishCopy .comments .length;                       //  Count number of total comments of the dish
        this .avgStars = ( total / this .numComments ) .toFixed( 2 );               //  Calculate the average rating of the dish

        this .dishService .putDish( this .dishCopy )        // Submit modifications
             .subscribe(
                  dish => {
                      this .dish = dish;
                      this .dishCopy = dish;
                  },
                  error => {
                      this .dish = null;
                      this .dishCopy = null;
                      this .errorMessage = <any>error
                  }
             );
    }

}
