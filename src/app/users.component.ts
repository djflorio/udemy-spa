import { Component } from '@angular/core';
import { OnInit, AfterContentInit } from '@angular/core';

import { UsersService } from './users.service';
import { User } from './user';

@Component({
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    users : User[];
    isLoading = true;

    constructor(private _usersService: UsersService) {}

    ngOnInit() {
        this._usersService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.isLoading = false;
            });
    }
}