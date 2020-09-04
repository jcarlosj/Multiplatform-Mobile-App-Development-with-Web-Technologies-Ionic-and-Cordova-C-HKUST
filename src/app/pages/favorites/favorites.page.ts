import { Component, OnInit, Inject } from '@angular/core';

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
        private favoriteService: FavoriteService,
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

    deleteFavorite( id: number ) {
        console .log( 'deleteFavorite', id );

        this .favoriteService .deleteFavorite (id )
                .subscribe( 
                    favorites => this .favorites = favorites,
                    error => this .errorMessage = error 
                );
    }

}
