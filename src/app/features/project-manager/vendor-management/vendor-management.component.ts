import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss'],
})
export class VendorManagementComponent implements OnInit {
  vendors: any[] = [];
  showVendorModal = false;
  editingVendor = false;
  currentVendor: any = {};
  token: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch token from local storage
    this.token = localStorage.getItem('token');

    if (!this.token) {
      console.error('Authorization token is missing.');
      return;
    }

    // Fetch the list of vendors from the backend
    this.fetchVendors();
  }

  fetchVendors(): void {
    this.http
      .get<any[]>('https://localhost:7050/api/Vendor/all', {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: '*/*',
        },
      })
      .subscribe(
        (response) => {
          this.vendors = response || []; // Adjust based on response structure
        },
        (error) => console.error('Error fetching vendors:', error)
      );
  }

  openAddVendorModal(): void {
    this.editingVendor = false;
    this.currentVendor = {};
    this.showVendorModal = true;
  }

  openEditVendorModal(vendor: any): void {
    this.editingVendor = true;
    this.currentVendor = { ...vendor };
    this.showVendorModal = true;
  }

  closeVendorModal(): void {
    this.showVendorModal = false;
    this.currentVendor = {};
  }

  onSubmitVendor(): void {
    if (this.editingVendor) {
      // Editing vendor logic (to be implemented if needed)
      console.warn('Edit vendor logic is not yet integrated.');
    } else {
      this.createVendor();
    }
  }

  createVendor(): void {
    const vendorToSend = {
      ...this.currentVendor,
      id: '', // Ensure id is empty for new vendors
    };

    this.http
      .post('https://localhost:7050/api/Vendor/create', vendorToSend, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          console.log(response.message); // Log success message
          this.fetchVendors(); // Refresh vendor list
          this.closeVendorModal();
        },
        (error) => console.error('Error creating vendor:', error)
      );
  }

  deleteVendor(vendorId: string): void {
    console.log('Deleting vendor with ID:', vendorId); // Log vendorId

    const token = localStorage.getItem('token');
    if (token && vendorId) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      });

      const url = `https://localhost:7050/api/Vendor/${vendorId}`;

      // Optimistically remove the vendor from the list
      this.vendors = this.vendors.filter(vendor => vendor.id !== vendorId);

      this.http.delete(url, { headers, responseType: 'text' }).subscribe(
        (response) => {
          console.log('Vendor deleted successfully:', response);
          this.fetchVendors(); // Refresh the vendor list after deletion
        },
        (error) => {
          console.error('Error deleting vendor:', error);
          this.fetchVendors(); // Refresh the vendor list in case of error
        }
      );
    } else {
      console.error('Invalid token or vendor ID missing');
    }
  }
}
