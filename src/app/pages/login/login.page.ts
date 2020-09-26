import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

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

    constructor(
        private modalController: ModalController,
        private fb: FormBuilder
    ) { 
        this .createForm();
    }

    ngOnInit() {
    }

    dismissModal() {
        this .modalController .dismiss();
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
             .subscribe( data => console .log( data ) );
    }

    onSubmit() {
        this .logIn = this .logInForm .value;

        console .log( 'this.dishCommentForm', this .logInForm );
        console .log( 'Sent', this .logIn );
        //this .modalController .dismiss( this .logInForm .value );        //  Returns data from the comment to the component that launched the modal

        this .logInForm .reset({
            username: '',
            password: '',
            remember: true
        });
    }

}
