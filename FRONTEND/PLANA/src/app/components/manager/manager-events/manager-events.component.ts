import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-manager-events',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manager-events.component.html',
  styleUrl: './manager-events.component.css'
})
export class ManagerEventsComponent implements OnInit {

  ngOnInit(): void {
    const createEventBtn = document.getElementById('create-event-btn') as HTMLElement;
    const createEventModal = document.getElementById('create-event-modal') as HTMLElement;
    const closeBtn = document.querySelector('.modal .close') as HTMLElement;
    const cancelBtn = document.querySelector('.modal .cancel-btn') as HTMLElement;

    createEventBtn.addEventListener('click', () => {
      createEventModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
      createEventModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
      createEventModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === createEventModal) {
        createEventModal.style.display = 'none';
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      form.reset();
      document.getElementById('create-event-modal')!.style.display = 'none';
    } else {
      console.log('Form is invalid!');
    }
  }

  onCancel() {
    document.getElementById('create-event-modal')!.style.display = 'none';
  }
}
