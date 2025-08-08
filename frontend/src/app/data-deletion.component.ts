import { Component } from '@angular/core';

@Component({
  selector: 'app-data-deletion',
  standalone: true,
  templateUrl: './data-deletion.component.html',
  styleUrls: ['./data-deletion.component.scss']
})
export class DataDeletionComponent {

  onDeleteRequest() {
    // This would typically send a request to your backend
    alert('Data deletion request submitted. You will receive a confirmation email within 24 hours.');
  }
}
