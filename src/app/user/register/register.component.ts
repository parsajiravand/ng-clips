import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  submitLoading = false;
  showAlert = false;
  alertMsg = 'Please wait! We are processing your request...';
  alertColor = 'blue';

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(140),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ),
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  });

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are processing your request...';
    this.alertColor = 'blue';
    this.submitLoading = true;
    const { email, password } = this.registerForm.value;
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email as string,
        password as string
      );
      await this.db
        .collection('users')
        .add({
          name: this.registerForm.value.name,
          age: this.registerForm.value.age,
          email: this.registerForm.value.email,
          phoneNumber: this.registerForm.value.phoneNumber,
        });
      console.log(userCred);
      this.submitLoading = false;

    } catch (error: any) {
      console.log(error);

      this.alertMsg = error.message || 'Something went wrong!';
      this.alertColor = 'red';
      this.submitLoading = false;

      return;
    }

    this.alertMsg = 'Registration successful!';
    this.alertColor = 'green';
  }
}
