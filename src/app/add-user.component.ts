import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './add-user.component.html'
})
export class AddUserComponent {
    form: FormGroup;

    constructor(@Inject(FormBuilder) fb: FormBuilder) {
        this.form = fb.group({
            user: fb.group({
                name: [],
                email: [],
                phone: []
            }),
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }
}