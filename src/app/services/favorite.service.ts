import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/** Services */
import { DishService } from '../services/dish.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
    /** Atributes */
    favorites: Array<number> = [];

    constructor(
        private dishService: DishService,
        private storage: Storage
    ) { 
        this .checkStorage() .then( data => {
            this .favorites = data;
            console .log( 'this.favorites', this .favorites );
        });
    }

    /** check if there is data in the storage */
    public async checkStorage() {

        const 
            ids: number[] = await this .getStorage( 'favorites' ) 
                .then( data => {
                    let idsFavs;
                    console .log( 'data', data );

                    if( ! data || data .length === 0 ) {
                        idsFavs = [];
                        this .favorites = [];
                        console .log( 'No data in Storage', idsFavs );
                    }
                    else {
                        idsFavs = data;
                        this .favorites = data;
                        console .log( 'Storage data', idsFavs );
                    }
                    console .log( 'getStorage', idsFavs );

                    return idsFavs;
                });

        console .log( 'checkStorage', ids );
        
        return ids;
    }

    public setStorage( settingName, value ){
        return this .storage .set( `conFusion:${ settingName }`, value );
    }

    public async getStorage( settingName ){
        return await this .storage .get( `conFusion:${ settingName }` );
    }

    public async removeStorage( settingName ){
        return await this .storage .remove( `conFusion:${ settingName }` );
    }

    public clearStorage() {
        this .storage .clear() .then(() => {
            console .log( 'all keys cleared' );
        });
    }

    /** Add a Favorite Dish */
    addFavorite( id: number ): boolean {
        if( ! this .isFavorite( id ) ) {
            this .favorites .push( id );
            this .setStorage( 'favorites', this .favorites );
            console .log( 'addFavorite', this .favorites );
        }

        return true;
    }

    /** Check if the dish ID is favorite */
    isFavorite( id: number ): boolean {
        console .log( 'isFavorite', this .favorites );
        return this .favorites .some( indexValue => indexValue === id );        //  Checks if at least one element of the array meets the condition
    }

    /** Remove an ID from the list of favorite dishes */
    async deleteFavorite( id: number ): Promise<boolean | number[]> {
        let index = this .favorites .indexOf( id );     //  Returns the first index at which a given element can be found

        if( index >= 0 ) {
            await this .favorites .splice( index, 1 );        //  Remove an element from the "index" index of the Favorites Array
            await this .setStorage( 'favorites', this .favorites );
            console .info( 'favorites', this .favorites );
            return this .checkStorage();
        }
        else {
            console .log( 'Deleting non-existant favorite', id );
            return false;
        }
    }

}
