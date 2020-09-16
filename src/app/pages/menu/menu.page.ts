import { Component, OnInit, Inject, DoCheck, ViewChildren, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { Gesture, GestureController, IonCard, ToastController } from '@ionic/angular';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';

/** Service */
import { DishService } from '../../services/dish.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, DoCheck {
    /** Atributes */
    dishes: Dish[];
    errorMessage: string;
    hasDishes: boolean = false;

    @ViewChildren( IonCard, { read: ElementRef } ) ionCards: QueryList< ElementRef >;
    favorite: boolean;
    
    constructor(
        private router: Router,
        private dishService: DishService,
        private favoriteService: FavoriteService,
        @Inject( 'BaseURL' ) private BaseURL,
        private gestureCtrl: GestureController,
        public toastController: ToastController, 
        public renderer: Renderer2
    ) { 
        console .log( 'BaseURL', this .BaseURL );
    }

    ngOnInit() {
        /** Receive a Observable */
        this .dishService .getDishes()
             .subscribe(    // Subscription to the Observable receives two callbacks, the data obtained, the error messages
                    dishes => {
                        this .dishes = dishes;
                        this .hasDishes = true;
                    },
                    error => this .errorMessage = <any>error
              );
    }

    /** A lifecycle hook that invokes a custom change-detection function for a directive, in addition to the check performed by the default change-detector. */
    ngDoCheck() {
        //console .group( 'ngDoCheck' );

        if( this .hasDishes ) {
            const cardArray = this .ionCards .toArray();

            this .useGestures( cardArray );
            
            // console .log( 'hasDishes', this .hasDishes );
            // console .log( 'dishes', this .dishes );
            // console .log( 'IonCards', cardArray );
        }

        //console .groupEnd();
    }

    useGestures( cardArray ) {
        for( let i = 0; i < cardArray .length; i++ ) {
            let 
                card = cardArray[ i ],
                elCard = card .nativeElement,
                dishId: number = parseInt( elCard .getAttribute( 'data-dish-id' ) );
            
            // console .log( 'card', card. nativeElement );
            // console .log( 'Dish ID', dishId );

            const gesture: Gesture = this .gestureCtrl .create({
                el: card .nativeElement,
                threshold: 5,
                passive: false,
                gestureName: 'tinder-swipe',
                gesturePriority: 100,
                onStart: ev => {
                    console .log( 'onStart', ev );

                    //  Implement this callback to set a CSS style for an element in the DOM.
                    this .renderer .setStyle(      
                        card .nativeElement, 
                        'transition', 
                        'none' 
                    );
                },
                onMove: ev => {
                    console .log( 'onMove', ev );

                    //  Implement this callback to set a CSS style for an element in the DOM.
                    this .renderer .setStyle(      
                        card .nativeElement, 
                        'transform', 
                        `translateX( ${ ev .deltaX }px )` 
                    );
                },
                onEnd: ev => {
                    console .log( 'onEnd', ev );

                    // Implement this callback to set a CSS style for an element in the DOM.
                    this .renderer .setStyle(      
                        card .nativeElement, 
                        'transition', 
                        '0.4s ease-out' 
                    );

                    if( ev .deltaX > 35 ) {            //  If the movement exceeds 35px, it has been moved to the right and removes dish from favorites
                        console .log( 'Right!' );
                        // Implement this callback to set a CSS style for an element in the DOM.
                        this .renderer .setStyle(      
                            card .nativeElement, 
                            'transform', 
                            `translateX( 10px )`
                        );
                        this .removeFromFavorites( dishId );

                    } else if( ev .deltaX < -35 ) {    //  If the move exceeds -35px, it has been moved to the left and adds plate to favorites
                        console .log( 'Left!' );
                        // Implement this callback to set a CSS style for an element in the DOM.
                        this .renderer .setStyle(      
                            card .nativeElement, 
                            'transform', 
                            `translateX( -10px )`
                        );
                        this .addToFavorites( dishId );
                        
                    } else {
                        console .log( 'Original!', dishId );

                        // Implement this callback to set a CSS style for an element in the DOM.
                        this .renderer .setStyle(      
                            card .nativeElement, 
                            'transform', 
                            `translateX( 0px )`
                        );
                    }

                }
            }, true );
            // The `true` above ensures that callbacks run inside NgZone.

            gesture .enable();
        }
    }

    async addToFavorites( id: number ) {
        console .log( 'Adding to Favorites', id );
        this .favoriteService .addFavorite( id );

        /** Define Toast */
        const toast = await this .toastController .create({
            message: `Dish ${ id } added as favorite successfully`,
            duration: 3000
        });

        toast .present();
    }

    removeFromFavorites( id: number ) {
        console .log( 'Removing from Favorites', id );
        this .favoriteService .deleteFavorite( id );
    }

    dishSelected( event, dish: Dish ) {
        const dishObjectString = JSON .stringify( dish );       // Convert Object to String
        
        console .log( 'dishSelected', dish );
        this .router .navigate( [ '/dish-detail' ], { queryParams: { dish: dishObjectString } } );
    }

}