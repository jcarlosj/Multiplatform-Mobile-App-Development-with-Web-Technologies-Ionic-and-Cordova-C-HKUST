import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from '../shared/baseurl';

/** ReactiveX Libraries */
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/** Models */
import { Dish } from '../shared/interfaces/Dish';

/** Services */
import { ProcessHttpMessageService } from '../services/process-http-message.service';

@Injectable({
    providedIn: 'root'
})
export class DishService {

    constructor(
        private http: HttpClient,
        private processHttpMessageService: ProcessHttpMessageService
    ) {
        console .log( `BASE_URL`, BASE_URL );
    }

    /** Get all the dishes */
    getDishes(): Observable< Dish[] > {
        return this .http .get< Dish[] >( `${ BASE_URL }dishes` )                           // Returns an observable that contains an Array with Objects of Type Dish
                    .pipe( catchError( this .processHttpMessageService .handleError ) );    // Handle the error and extract the message
    }

    /** Get dish by ID */
    getDish( id: string ): Observable< Dish > {
        return this .http .get< Dish >( `${ BASE_URL }dishes/${ id }` )                     // Returns an observable that contains an Object of Type Dish
                    .pipe( catchError( this .processHttpMessageService .handleError ) );    // Handle the error and extract the message
    }

    /** Get only featured dishes */
    getFeaturedDish(): Observable< Dish > {
        return this .http .get< Dish[] >( `${ BASE_URL }dishes?featured=true` )             // Returns an observable that contains an Array with Objects of Type Dish
                    .pipe(
                        map( dishes => dishes[ 0 ] )
                    )
                    .pipe( catchError( this .processHttpMessageService .handleError ) );    // Handle the error and extract the message
    }

    /** Modify a dish */
    putDish( dish: Dish ): Observable< Dish > {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this .http .put< Dish >( `${ BASE_URL }dishes/${ dish .id }`, dish, httpOptions )
                    .pipe( catchError( this .processHttpMessageService .handleError ) );  // Handle the error and extract the message
    }
    
}