import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from './email-validators';

@Component({
    templateUrl: './add-user.component.html'
})
export class AddUserComponent {
    form: FormGroup;
    minNameLength = 4;
    maxNameLength = 20;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.form = this._fb.group({
            user: this._fb.group({
                name: ['', [
                    Validators.required,
                    Validators.minLength(this.minNameLength),
                    Validators.maxLength(this.maxNameLength)
                    ]
                ],
                email: ['', EmailValidators.mustBeValidEmail],
                phone: ['']
            }),
            address: this._fb.group({
                street: [''],
                suite: [''],
                city: [''],
                zipcode: ['']
            })
        });
    }

    save() {
        console.log("save");
    }

}