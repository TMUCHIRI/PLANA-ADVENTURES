import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, LoginComponent, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  passwordMatchError: boolean = false;
  showErrorMessages: boolean = true;
  registerSuccess: boolean = false;
  error = '';
  successMessage = '';

  onSubmit(form: NgForm) {
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMatchError = true;
      this.setErrorTimeout();
    } else {
      this.passwordMatchError = false;
      // Submit form logic here
    }

    if (form.invalid) {
      this.setErrorTimeout();
    }else{
      this.registerSuccess = true;
      setTimeout(() => {
        
        this.router.navigate(['/login'])
      }, 3000)
      
    }
  }

  setErrorTimeout() {
    // this.showErrorMessages = true;
    setTimeout(() => {
      this.showErrorMessages = false;
      this.error = '';
    }, 3000);
  }
}
