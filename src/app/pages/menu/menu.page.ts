import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';

/** Service */
import { DishService } from '../../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    /** Atributes */
    dishes: Dish[];
    errorMessage: string;

    constructor(
        private router: Router,
        private dishService: DishService,
        @Inject( 'BaseURL' ) private BaseURL
    ) { 
        console .log( 'BaseURL', this .BaseURL );
    }

    ngOnInit() {
        /** Receive a Observable */
        this .dishService .getDishes()
             .subscribe(    // Subscription to the Observable receives two callbacks, the data obtained, the error messages
                  dishes => this .dishes = dishes,
                  error => this .errorMessage = <any>error
              );
    }

    dishSelected( event, dish: Dish ) {
        const dishObjectString = JSON .stringify( dish );       // Convert Object to String
        
        console .log( 'dishSelected', dish );
        this .router .navigate( [ '/dish-detail' ], { queryParams: { dish: dishObjectString } } );
    }

}