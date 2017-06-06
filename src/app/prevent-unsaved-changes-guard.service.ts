import { CanDeactivate } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormComponent } from './form-component';

export class PreventUnsavedChangesGuard implements CanDeactivate<FormComponent> {
    canDeactivate(component: FormComponent) {
        if (component.form.dirty)
                return confirm("Are you sure?");
        
        return true;
    }
}