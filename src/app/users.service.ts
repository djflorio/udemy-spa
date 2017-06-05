import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
    constructor(private _http: Http) {}

    getUsers() : Observable<User[]> {
        return this._http.get('http://jsonplaceholder.typicode.com/users')
            .map(res => res.json() as User[]);
    }
}