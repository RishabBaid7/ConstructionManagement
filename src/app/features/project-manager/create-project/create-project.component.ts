import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'], // Fixed typo in "styleUrl"
})
export class CreateProjectComponent {
  project = {
    id: '', // Send empty id
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: '',
    projectManagerId: '', // Add ProjectManagerId field
  };

  statuses = ['Not Started', 'In Progress', 'Completed', 'On Hold'];

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Fetch token and user ID from local storage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');

    if (!token || !userId) {
      alert('User is not authenticated. Please log in again.');
      return;
    }

    // Assign ProjectManagerId
    this.project.projectManagerId = userId;

    // Set headers for the request
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Send POST request to the backend
    this.http
      .post('https://localhost:7050/api/project/create', this.project, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Project created successfully:', response);
          alert('Project created successfully!');
          
          // Navigate to manager-dashboard on success
          this.router.navigate(['/manager-dashboard']);
        },
        error: (error) => {
          console.error('Error creating project:', error);
          alert('Failed to create project. Please try again.');
        },
      });
  }
}
