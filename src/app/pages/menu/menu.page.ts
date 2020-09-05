import { Component, OnInit, Inject, DoCheck, ViewChildren, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Gesture, GestureController, IonCard } from '@ionic/angular';

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
    longPressActive: boolean = false;
    
    constructor(
        private router: Router,
        private dishService: DishService,
        private favoriteService: FavoriteService,
        @Inject( 'BaseURL' ) private BaseURL,
        private gestureCtrl: GestureController,
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
            let card = cardArray[ i ];
            //console .log( 'card', card );

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
                    //this .longPressActive = false;
                    console .log( 'onEnd', ev );

                    // Implement this callback to set a CSS style for an element in the DOM.
                    this .renderer .setStyle(      
                        card .nativeElement, 
                        'transition', 
                        '0.4s ease-out' 
                    );

                    if( ev .deltaX > 125 ) {            //  If the movement exceeds 125px, the element moves until it disappears on the right
                        console .log( 'Right!' );

                        // Implement this callback to set a CSS style for an element in the DOM.
                        this .renderer .setStyle(      
                            card .nativeElement, 
                            'transform', 
                            `translateX( 400px )`
                        );
                    } else if( ev .deltaX < -125 ) {    //  If the movement exceeds -125px, the element moves until it disappears to the left
                        console .log( 'Left!' );

                        // Implement this callback to set a CSS style for an element in the DOM.
                        this .renderer .setStyle(      
                            card .nativeElement, 
                            'transform', 
                            `translateX( -400px )`
                        );
                    } else {
                        console .log( 'Original!' );

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

    dishSelected( event, dish: Dish ) {
        const dishObjectString = JSON .stringify( dish );       // Convert Object to String
        
        console .log( 'dishSelected', dish );
        this .router .navigate( [ '/dish-detail' ], { queryParams: { dish: dishObjectString } } );
    }

    addToFavorites( dish: Dish ) {
        console .log( 'addToFavorites', dish .id );
        this .favoriteService .addFavorite( dish .id );
    }

}