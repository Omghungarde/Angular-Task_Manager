import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'overdue':
        return 'status-overdue'; 
      default:
        return 'status-default';
    }
  }
}
