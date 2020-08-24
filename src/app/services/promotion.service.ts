import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from '../shared/baseurl';

/** ReactiveX Libraries */
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/** Models */
import { Promotion } from '../shared/interfaces/Promotion';

/** Services */
import { ProcessHttpMessageService } from '../services/process-http-message.service';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    constructor(
        private http: HttpClient,
        private processHttpMessageService: ProcessHttpMessageService
    ) { }

    /** Get all the promotions */
    getPromotions(): Observable<Promotion[]> {
        return this .http .get< Promotion[] >( `${ BASE_URL }promotions` )                // Returns an observable that contains an Array with Objects of Type Promotion
                    .pipe( catchError( this .processHttpMessageService .handleError ) );  // Handle the error and extract the message
    }

    /** Get promotion by ID */
    getPromotion( id: string ): Observable<Promotion> {
        return this .http .get< Promotion >( `${ BASE_URL }promotions/${ id }` )          // Returns an observable that contains an Object of Type Promotion
                    .pipe( catchError( this .processHttpMessageService .handleError ) );  // Handle the error and extract the message
    }
    /** Get only featured promotions */
    getFeaturedPromotion(): Observable<Promotion> {
        return this .http .get< Promotion >( `${ BASE_URL }promotions?featured=true` )    // Returns an observable that contains an Array with Objects of Type Promotion
                    .pipe( map( promotions => promotions[ 0 ] ) )
                    .pipe( catchError( this .processHttpMessageService .handleError ) );  // Handle the error and extract the message
    }

}