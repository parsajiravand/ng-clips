import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  submitLoading = false;
  showAlert = false;
  alertMsg = 'Please wait! We are processing your request...';
  alertColor = 'blue';

  user: { email: string; password: string } = { email: '', password: '' };

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are processing your request...';
    this.alertColor = 'blue';
    this.submitLoading = true;
    try {
      await this.auth.loginUser(
        this.user as { email: string; password: string }
      );
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
