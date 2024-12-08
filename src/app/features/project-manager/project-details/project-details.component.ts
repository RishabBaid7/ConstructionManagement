import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders for setting headers
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: any; // Holds the current project details

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient, // Inject HttpClient service
    private location: Location
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id')!; // Get the project ID from the route

    // Fetch token from local storage
    const token = localStorage.getItem('token');
    
    // Set the Authorization header with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Call the API to fetch project details by ID with the Authorization header
    this.http.get(`https://localhost:7050/api/Project/${projectId}`, { headers }).subscribe(
      (response: any) => {
        this.project = response; // Set the response as the project details
      },
      (error) => {
        console.error('Error fetching project data', error);
      }
    );
  }

  navigateTo(feature: string) {
    this.location.back(); // Navigate back to the previous page
  }
}
