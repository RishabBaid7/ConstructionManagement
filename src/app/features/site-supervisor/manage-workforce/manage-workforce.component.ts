import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-workforce',
  templateUrl: './manage-workforce.component.html',
  styleUrls: ['./manage-workforce.component.scss'],
})
export class ManageWorkforceComponent {
  workforce: any[] = [];
  apiUrl = 'https://localhost:7050/api/Workforce';
  isAddWorkerModalOpen = false;
  newWorker = {
    projectId: '',
    taskId: '',
    role: '',
    attendanceStatus: '',
    performanceRating: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch the workforce on component load
    this.getAllWorkforce();
  }

  openAddWorkerModal() {
    this.isAddWorkerModalOpen = true;
  }

  closeAddWorkerModal() {
    this.isAddWorkerModalOpen = false;
    // Reset the form data
    this.newWorker = {
      projectId: '',
      taskId: '',
      role: '',
      attendanceStatus: '',
      performanceRating: null
    };
  }

  // Fetch all workers from the API
  getAllWorkforce() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`${this.apiUrl}/all`, { headers }).subscribe(
      (data) => {
        this.workforce = data;
      },
      (error) => {
        console.error('Error fetching workforce:', error);
      }
    );
  }

  // Add a new worker to the workforce using the API
  addWorker() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      id: '',
      projectId: this.newWorker.projectId,
      taskId: this.newWorker.taskId,
      role: this.newWorker.role,
      attendanceStatus: this.newWorker.attendanceStatus,
      performanceRating: this.newWorker.performanceRating,
    };

    this.http.post(`${this.apiUrl}/create`, payload, { headers }).subscribe(
      (response) => {
        console.log('Worker added successfully:', response);
        this.getAllWorkforce(); // Refresh the workforce list
        this.closeAddWorkerModal(); // Close the modal after adding the worker
      },
      (error) => {
        console.error('Error adding worker:', error);
      }
    );
  }

  editWorker(worker: any) {
    alert(`Editing Worker: ${worker.name}`);
  }

  deleteWorker(workerId: number) {
    this.workforce = this.workforce.filter((w) => w.id !== workerId);
    alert('Worker Deleted');
  }
}
