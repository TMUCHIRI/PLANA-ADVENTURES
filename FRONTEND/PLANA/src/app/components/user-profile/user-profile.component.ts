import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private router: Router, private authService: AuthService) {}

  user = {
    email: '',
    password: ''
  };

  showErrorMessages: boolean = false;
  updateSuccess: boolean = false;
  error = '';
  successMessage = '';

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showErrorMessages = true;
      this.setErrorTimeout();
      return;
    }

    this.authService.updateUserProfile(this.user.email, this.user.password).subscribe(
      (response) => {
        if (response.success) {
          this.updateSuccess = true;
          this.successMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.error = response.error;
          this.setErrorTimeout();
        }
      },
      (error) => {
        this.error = 'Server error. Please try again later.';
        this.setErrorTimeout();
      }
    );

    console.log('Profile updated:', this.user);
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.showErrorMessages = false;
      this.error = '';
    }, 3000);
  }
}
