import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private router: Router) {}
  user = {
    email: '',
    password: ''
  };

  showErrorMessages: boolean = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showErrorMessages = true;
      this.setErrorTimeout();
      return;
    }else{
      setTimeout(()=>{
        this.router.navigate(['/login'])
      }, 3000)
    }
    
    // Update profile logic here
    console.log('Profile updated:', this.user);
  }

  setErrorTimeout() {
    setTimeout(() => {
      this.showErrorMessages = false;
    }, 3000);
  }
}
