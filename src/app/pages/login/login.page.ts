import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

/** Model */
import { Login } from '../../shared/interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    /** Atributes */
    logInForm: FormGroup;
    logIn: Login = { username: '', password: '' };

    // It will contain the error messages to display for each field of the form defined here
    formErrors = {
        'username': '',
        'password': ''
    };
    // It will contain the messages for each type of expected error per form field
    validationsMessages = {
        'username': {
            'required': 'Username is required',
            'minlength': 'Username must be at least 4 characters long',
            'maxlength': 'Username must be less than 30 characters',
            'pattern': 'Username must have characters from A to Z and underscores'
        },
        'password': {
            'required': 'Password is required',
            'minlength': 'Password must be at least 8 characters long',
            'pattern': 'Password must have numbers, characters from A to Z (lowercase or uppercase) and only the following signs @ . # * $ ! ? & + - /'
        }
    };

    @ViewChild( 'loginForm' ) logInFormDirective;

    constructor(
        private modalController: ModalController,
        private fb: FormBuilder,
        private storage: Storage
    ) { 
        this .verifyStorage();
        this .createForm();
    }

    ngOnInit() {
    }

    dismissModal() {
        this .modalController .dismiss();
    }

    private verifyStorage() {

        this .storage 
             .get( 'UserLoggedIn' )     //  Get data stored in the browser
             .then( user => {
            
                /** Validates if there is stored user data */
                if( user ) {
                    console .log( user );
                    this .logIn = user;
                
                    /** patchValue() method to replace any properties defined in the object that have changed in the form model. */
                    this .logInForm .patchValue({
                        'username': this .logIn .username, 
                        'password': this .logIn .password 
                    });
                }
                else {
                    console .log( 'User not defined' );
                }
                
        });
    }

    private createForm() {
        /** Define State Form (Add Form Validation) */
        this .logInForm = this .fb .group({
            username: [ '', [
                Validators .minLength( 4 ),
                Validators .maxLength( 30 ),
                Validators .pattern( "[0-9a-z-A-Z-_]*" ),
                Validators .required
            ]],
            password: [ '', [
                Validators .minLength( 8 ),
                Validators .pattern( "[0-9a-z-A-Z@.#*$!?&+-/]*" ),
                Validators .required
            ]],
            remember: true
        });

        /** Observable: Subscribe to the Angular Form observable named valueChanges */
        this .logInForm .valueChanges
             .subscribe( data => {
                console .log( data );
                this .onValueChanged( data );
            });
    }

    /** Method that validates when the value of a form field has changed  */
    onValueChanged( data?: any ) {
        // Validate if feedBackForm has NOT been created
        if( !this .logInForm ) {
            return;
        }

        const form = this .logInForm;
        // console .log( 'this.feedBackForm', form );

        // Loops through form fields defined in formErrors
        for( const field in this .formErrors ) {
            if( this .formErrors .hasOwnProperty( field ) ) {
                // Clear previous error message (if any)
                this .formErrors[ field ] = '';

                const control = form .get( field );
                // console .log( 'control', control );

                // Validate if it has a value, if the value of the field has changed, if the value is not valid
                if( control && control .dirty && !control .valid ) {
                    const messages = this .validationsMessages[ field ];     // Assign error message to the respective field
                    console .log( 'messages', messages );

                    for( const key in control .errors ) {
                        if( control .errors .hasOwnProperty( key ) ) {
                            this .formErrors[ field ] = messages[ key ] + ' ';
                        }
                    }
                }
            }
        }

        console .log( 'this.formErrors', this .formErrors );
        
    }

    onSubmit() {
        this .logIn = this .logInForm .value;

        console .log( 'this.dishCommentForm', this .logInForm );
        console .log( 'Sent', this .logIn );

        /** Assign the values of the reactive form to an object */
        this .logIn .username = this .logInForm .get( 'username' ) .value;
        this .logIn .password = this .logInForm .get( 'password' ) .value;

        /** Check if the remember field has been selected */
        if( this .logInForm .get( 'remember' ) .value ) {
            this .storage .set( 'UserLoggedIn', this .logIn );      //  Modify data stored in the browser
        }      
        else {
            this .storage .remove( 'UserLoggedIn' );                //  Delete data stored in the browser
        }
      

        this .modalController .dismiss( this .logInForm .value );        //  Returns data from the comment to the component that launched the modal

        this .logInForm .reset({
            username: '',
            password: '',
            remember: true
        });
    }

}
