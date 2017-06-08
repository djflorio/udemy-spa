import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from './email-validators';
import { FormComponent } from './form-component';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit, FormComponent {
    form: FormGroup;
    minNameLength = 4;
    maxNameLength = 20;

    constructor(private _fb: FormBuilder, private _usersService: UsersService, private _router: Router) { }

    ngOnInit() {
        this.form = this._fb.group({
            name: ['', [
                Validators.required,
                Validators.minLength(this.minNameLength),
                Validators.maxLength(this.maxNameLength)
                ]
            ],
            email: ['', EmailValidators.mustBeValidEmail],
            phone: [''],
            address: this._fb.group({
                street: [''],
                suite: [''],
                city: [''],
                zipcode: ['']
            })
        });
    }

    save() {
        this._usersService.addUser(this.form.value)
            .subscribe(user => {
                console.log(user);
                this.form.markAsPristine();
                this._router.navigateByUrl('/users');
            });
    }

}