import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}
  user = {
    email: '',
    password: ''
  };

  errorMessages = {
    email: '',
    password: ''
  };

  loginSuccess: boolean = false;
  successMessage = '';

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessages.email = this.getEmailErrorMessage(form.controls['email']);
      this.errorMessages.password = this.getPasswordErrorMessage(form.controls['password']);
      this.setErrorTimeout();
      return;
    }else{
      this.loginSuccess = true;
      setTimeout(()=> {
        this.router.navigate(['/user-dashboard'])
      }, 3000)
    }

    // Login logic here
  }

  getEmailErrorMessage(control: any): string {
    if (control.errors?.required) {
      return 'Email is required.';
    }
    if (control.errors?.email) {
      return 'Invalid email address.';
    }
    return '';
  }

  getPasswordErrorMessage(control: any): string {
    if (control.errors?.required) {
      return 'Password is required.';
    }
    return '';
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.errorMessages.email = ''
      this.errorMessages.password = ''
    }, 2000);
  }
}
