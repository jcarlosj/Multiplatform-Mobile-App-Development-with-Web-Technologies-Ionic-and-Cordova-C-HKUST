import { Component, OnInit, Inject } from '@angular/core';

/** Models */
import { Dish } from '../../shared/interfaces/Dish';
import { Promotion } from '../../shared/interfaces/Promotion';
import { Leader } from '../../shared/interfaces/Leader';

/** Services */
import { DishService } from '../../services/dish.service';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    /** Atributes */
    dish: Dish;
    dishErrorMessage: string;
    promotion: Promotion;
    promotionErrorMessage: string;
    leader: Leader;
    leaderErrorMessage: string;

    constructor(
        private dishService: DishService,
        private promotionService: PromotionService,
        private leaderService: LeaderService,
        @Inject( 'BaseURL' ) public BaseURL            // Mechanism for letting Angular know that a parameter must be injected
    ) {
        console .log( 'BaseURL', this .BaseURL );
    }

    ngOnInit() {
        /** Receive a Observable */
        this .dishService .getFeaturedDish()
             .subscribe(    // Subscription to the Observable receives two callbacks, the data obtained, the error messages
                  dish => this .dish = dish,
                  error => this .dishErrorMessage = <any> error
              );
        /** Receive a Observable */
        this .promotionService .getFeaturedPromotion()
             .subscribe(    // Subscription to the Observable receives two callbacks, the data obtained, the error messages
                  promotion => this .promotion = promotion,
                  error => this  .promotionErrorMessage = <any> error
              );
        /** Receive a Observable */
        this .leaderService .getFeaturedLeader()
             .subscribe(    // Subscription to the Observable receives two callbacks, the data obtained, the error messages
                  leader => this .leader = leader,
                  error => this .leaderErrorMessage = <any> error
              );
    }

}
