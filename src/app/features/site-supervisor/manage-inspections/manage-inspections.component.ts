import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Inspection {
  id: string;
  projectName: string;
  supervisorName: string;
  inspectionDate: string;
  findings: string;
  correctiveAction: string;
}

@Component({
  selector: 'app-manage-inspections',
  templateUrl: './manage-inspections.component.html',
  styleUrls: ['./manage-inspections.component.scss'],
})
export class ManageInspectionsComponent implements OnInit {
  inspections: Inspection[] = [];
  isModalOpen = false;
  isEditing = false;
  currentInspection: Inspection = {
    id: '',
    projectName: '',
    supervisorName: '',
    inspectionDate: '',
    findings: '',
    correctiveAction: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch inspections from the backend API
    this.fetchInspections();
  }

  fetchInspections() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<{ inspections: Inspection[] }>('https://localhost:7050/api/SafetyInspection/all', { headers })
      .subscribe(
        (response) => {
          this.inspections = response.inspections;
        },
        (error) => {
          console.error('Error fetching inspections:', error);
        }
      );
  }

  openAddInspectionModal() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.currentInspection = {
      id: '',
      projectName: '',
      supervisorName: '',
      inspectionDate: '',
      findings: '',
      correctiveAction: '',
    };
  }

  editInspection(inspection: Inspection) {
    this.isModalOpen = true;
    this.isEditing = true;
    this.currentInspection = { ...inspection };
  }

  saveInspection(event: Event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const newInspection: Inspection = {
      ...this.currentInspection,
      id: this.isEditing ? this.currentInspection.id : '', // Preserve ID if editing
    };

    // Sending POST request to create a new inspection
    if (this.isEditing) {
      this.http
        .put(`https://localhost:7050/api/SafetyInspection/update/${newInspection.id}`, newInspection, { headers })
        .subscribe(
          (response) => {
            this.fetchInspections(); // Re-fetch the updated list of inspections
            this.closeModal();
          },
          (error) => {
            console.error('Error updating inspection:', error);
          }
        );
    } else {
      this.http
        .post('https://localhost:7050/api/SafetyInspection/create', newInspection, { headers })
        .subscribe(
          (response) => {
            this.inspections.push(response as Inspection);
            this.closeModal();
          },
          (error) => {
            console.error('Error creating inspection:', error);
          }
        );
    }
  }

  deleteInspection(inspectionId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .delete(`https://localhost:7050/api/SafetyInspection/delete/${inspectionId}`, { headers })
      .subscribe(
        () => {
          this.inspections = this.inspections.filter((inspection) => inspection.id !== inspectionId);
        },
        (error) => {
          console.error('Error deleting inspection:', error);
        }
      );
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
