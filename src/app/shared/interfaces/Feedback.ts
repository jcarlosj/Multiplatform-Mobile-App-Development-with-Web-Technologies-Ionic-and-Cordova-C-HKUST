export interface Feedback {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    agree: boolean;
    contactType: string;
    message: string;
}

export const CONTACT_TYPE = [ 'None', 'Tel', 'Email' ];