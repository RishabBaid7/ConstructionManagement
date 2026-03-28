import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss'],
})
export class ManageProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Fetching projects from backend API with token in the Authorization header
      this.http.get<any>(`${environment.apiUrl}/Project/all`, {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}` // Add token dynamically
        }
      }).subscribe(
        (response: any) => {
          // Update projects list with the data from the backend
          this.projects = response.projects;
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    } else {
      console.error('No token found in localStorage');
    }
  }


  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      // Call backend API to delete the project
      this.http
        .delete(`${environment.apiUrl}/Project/${projectId}`, {
          headers: new HttpHeaders({
            accept: '*/*',
            Authorization: `Bearer ${token}`, // Add token dynamically
          }),
          responseType: 'text', // Expect a plain text response
        })
        .subscribe(
          (response) => {
            console.log(response); // Log the plain text response
            // Remove project from UI after successful deletion
            this.projects = this.projects.filter((p) => p.id !== projectId);
            // alert('Project deleted successfully.');
          },
          (error) => {
            console.error('Error deleting project:', error);
            alert('Failed to delete the project. Please try again.');
          }
        );
    }
  }
  
}
