import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss'],
})
export class ManagerDashboardComponent implements OnInit {
  projects: any[] = [];
  totalProjects: number = 0;
  milestonesAchieved: number = 0;
  upcomingDeadlines: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProjects();
  } 

  fetchProjects(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User is not authenticated. Please log in again.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>('https://localhost:7050/api/Project/all', { headers })
      .subscribe({
        next: (response) => {
          this.projects = response.projects || [];
          this.totalProjects = this.projects.length;
          this.calculateMilestonesAndDeadlines();
        },
        error: (error) => {
          console.error('Failed to fetch projects:', error);
          alert('Error fetching project data. Please try again.');
        },
      });
  }

  calculateMilestonesAndDeadlines(): void {
    this.milestonesAchieved = this.projects.filter(
      (project) => project.status === 'Completed' 
    ).length;
    this.upcomingDeadlines = this.projects.filter(
      (project) => project.status !== 'Completed'
    ).length;
  }

  calculateTotalBudget(): number {
    return this.projects.reduce(
      (total, project) => total + (project.budget || 0),
      0
    );
  }
}
