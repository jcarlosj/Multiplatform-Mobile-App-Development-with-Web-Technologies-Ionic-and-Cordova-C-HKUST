import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
    /** Atributes */
    dishCommentForm: FormGroup;
    dishComment: Comment;
    defaultValue: number = 0;

    visibilityStatus = 'shown';    // Initialize trigger state

    // It will contain the error messages to display for each field of the form defined here
    formErrors = {
        'author': '',
        'comment': ''
    };
    // It will contain the messages for each type of expected error per form field
    validationsMessages = {
        'author': {
            'required': 'Author name is required',
            'minlength': 'Author name must be at least 3 characters long'
        },
        'comment': {
            'required': 'Comment is required'
        }
    };

    @ViewChild( 'commentForm' ) dishCommentFormDirective;

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

    createForm() {
        const date = new Date();

        /** Define State Form (Add Form Validation) */
        this .dishCommentForm = this .fb .group({
            author: [ '', [
                Validators .required,
                Validators .minLength( 3 )
            ] ],
            comment: [ '', [
                Validators .required
            ] ],
            date: date .toISOString(),
            rating: 0
        });

        /** Observable: Subscribe to the Angular Form observable named valueChanges */
        this .dishCommentForm .valueChanges
            .subscribe( data => this .onValueChanged( data ) );

            this .onValueChanged();     // Reset Form Validation Messages
    }

    /** Method that validates when the value of a form field has changed  */
    onValueChanged( data?: any ) {
        // Validate if feedBackForm has NOT been created
        if( !this .dishCommentForm ) {
            return;
        }

        const form = this .dishCommentForm;
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
        this .dishComment = this .dishCommentForm .value;

        console .log( 'this.dishCommentForm', this .dishCommentForm );
        console .log( 'Sent', this .dishComment );

        this .dishCommentForm .reset({
            author: '',
            comment: '',
            date: '',
            rating: this .defaultValue
        });

        this .dishCommentFormDirective .reset();
    }

}
