import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/** ReactiveX Library */
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProcessHttpMessageService {

    constructor( public http: HttpClient ) { 
        console .log( 'Hello ProcessHttpMessageService!' );
    }

    public handleError( error: HttpErrorResponse | any ) {
        let errorMessage: string;

        // ErrorEvent interface represents events providing information related to errors in scripts or in files.
        if( error .error instanceof ErrorEvent ) {
            errorMessage = error .error .message;
        } else {
            errorMessage = `${ error .status } - ${ error .statusText || '' } ${ error .error }`;
        }

        return throwError( errorMessage );    // Return and Observable
    }

}