import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmailTaken implements AsyncValidator {
  constructor(private auth: AngularFireAuth) {}

  validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve, reject) => {
      this.auth
        .fetchSignInMethodsForEmail(control.value)
        .then((methods) => {
          if (methods.length > 0) {
            resolve({ emailTaken: true });
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          resolve(null);
        });
    });
  };
}
