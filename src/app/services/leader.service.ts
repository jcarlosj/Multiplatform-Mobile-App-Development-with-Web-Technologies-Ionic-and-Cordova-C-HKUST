import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from '../shared/baseurl';

/** ReactiveX Libraries */
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/** Models */
import { Leader } from '../shared/interfaces/Leader';

/** Services */
import { ProcessHttpMessageService } from '../services/process-http-message.service';
import { Promotion } from '../shared/interfaces/Promotion';

@Injectable({
    providedIn: 'root'
})
export class LeaderService {

    constructor(
        private http: HttpClient,
        private processHttpMessageService: ProcessHttpMessageService
    ) { }

    /** Get all the leaders */
    getLeaders(): Observable<Leader[]> {
        return this .http .get< Leader[] >( `${ BASE_URL }leadership` )                     // Returns an observable that contains an Array with Objects of Type Leader
                    .pipe( catchError( this .processHttpMessageService .handleError ) );    // Handle the error and extract the message
    }

    /** Get leader by ID */
    getLeader( id: string ): Observable<Leader> {
        return this .http .get< Leader >( `${ BASE_URL }leadership/${ id }` )               // Returns an observable that contains an Object of Type Leader
                    .pipe( catchError( this .processHttpMessageService .handleError ) );    // Handle the error and extract the message
    }

    /** Get only featured leaders */
    getFeaturedLeader(): Observable<Leader> {
        return this .http .get< Leader[] >( `${ BASE_URL }leadership?featured=true` )        // Returns an observable that contains an Array withs Objects of Type Dish
                    .pipe(
                        map( leaders => leaders[ 0 ] )
                    )
                    .pipe( catchError( this .processHttpMessageService .handleError ) );              // Handle the error and extract the message
    }
}