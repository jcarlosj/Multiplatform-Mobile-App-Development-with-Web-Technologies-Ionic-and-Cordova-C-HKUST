import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';

/** ReactiveX Library */
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.page.html',
  styleUrls: ['./dish-detail.page.scss'],
})
export class DishDetailPage implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        @Inject( 'BaseURL' ) public BaseURL            // Mechanism for letting Angular know that a parameter must be injected
    ) { 
        console .log( 'BaseURL', this .BaseURL );
        
        this .activatedRoute .queryParams 
              .pipe(
                  map( ( dish: Dish ) => dish )
              )
              .subscribe( ( dish: Dish )  => {
                    console .log( 'DishDetailPage', dish );       // Dish Object Data
              });
    }

    ngOnInit() {
    }

}
