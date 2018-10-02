export interface IUser {
    name ?: string;
    uid: string;
    email: string;
    bio ?: string;
    // tslint:disable-next-line:semicolon
    tokens ?: {[token: string]: boolean}

}
