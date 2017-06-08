import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {
    private usersUrl = 'http://jsonplaceholder.typicode.com/users';

    constructor(private _http: Http) {}

    getUsers() : Observable<User[]> {
        return this._http.get(this.usersUrl)
            .map(res => res.json() as User[]);
    }

    addUser(post) : Observable<User> {
        return this._http.post(this.usersUrl, JSON.stringify(post))
            .map(res => res.json());
    }
}