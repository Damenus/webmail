import { AbstractControl } from '@angular/forms';

export function serverAddress(control: AbstractControl) {
    let serverAddressRegExp = new RegExp('[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+');
    if (control.value === null || !serverAddressRegExp.test(control.value) ) {
        return { validServerAddress: true };
    }
    return null;
}