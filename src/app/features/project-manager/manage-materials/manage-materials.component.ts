import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient and HttpHeaders
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-materials',
  templateUrl: './manage-materials.component.html',
  styleUrls: ['./manage-materials.component.scss'],
})
export class ManageMaterialsComponent implements OnInit {
  materials: any[] = [];
  isAddMaterialModalOpen = false;
  newMaterial = {
    materialName: '',
    quantity: 0,
    supplierId: '',
    cost: 0,
    status: 'Available',
  };
  projectId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    // Get project ID from URL
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.fetchMaterials();
    }
  }

  fetchMaterials() {
    const token = localStorage.getItem('token');
    if (token && this.projectId) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });

      const url = `https://localhost:7050/api/Material/project/${this.projectId}`;
      this.http.get<{ materials: any[] }>(url, { headers }).subscribe(
        (response) => {
          this.materials = response.materials;
        },
        (error) => {
          console.error('Error fetching materials:', error);
        }
      );
    } else {
      console.error('Project ID or Token is missing');
    }
  }

  openAddMaterialModal() {
    this.isAddMaterialModalOpen = true;
  }

  closeAddMaterialModal() {
    this.isAddMaterialModalOpen = false;
    this.newMaterial = {
      materialName: '',
      quantity: 0,
      supplierId: '',
      cost: 0,
      status: 'Available',
    };
  }

  addMaterial() {
    if (this.projectId) {
      const materialData = {
        ...this.newMaterial,
        projectId: this.projectId,
        id: '', // ID to be generated by backend
      };

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });

      this.http.post('https://localhost:7050/api/Material/create', materialData, { headers }).subscribe(
        (response: any) => {
          console.log('Material created successfully', response);
          this.fetchMaterials(); // Refresh materials list after adding
          this.closeAddMaterialModal();
        },
        (error) => {
          console.error('Error creating material:', error);
        }
      );
    }
  }

  deleteMaterial(id: string) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
  
      const url = `https://localhost:7050/api/Material/${id}`;
      
      // Optimistically remove the material from the list
      this.materials = this.materials.filter(material => material.id !== id);
  
      this.http.delete(url, { headers, responseType: 'text' }).subscribe(
        (response) => {
          console.log('Material deleted successfully:', response);
        },
        (error) => {
          console.error('Error deleting material:', error);
          
          // If deletion failed, refresh the list
          this.fetchMaterials(); // Refresh the materials list in case of error
        }
      );
    }
  }
  
  
}