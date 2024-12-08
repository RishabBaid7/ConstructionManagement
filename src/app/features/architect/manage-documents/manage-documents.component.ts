import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-documents',
  templateUrl: './manage-documents.component.html',
  styleUrls: ['./manage-documents.component.scss']
})
export class ManageDocumentsComponent {
  documentType: string = 'Blueprint';
  uploadDate: string = '';
  versionNumber: string = '';
  file: any;
  documents: any[] = [
    {
      documentType: 'Blueprint',
      uploadedBy: 'John Doe',
      uploadDate: new Date(),
      versionNumber: 'v1.0',
    },
    {
      documentType: 'Construction Plan',
      uploadedBy: 'Jane Smith',
      uploadDate: new Date(),
      versionNumber: 'v2.1',
    }
  ];

  // Handle file selection
  onFileSelect(event: any): void {
    this.file = event.target.files[0];
  }

  // Handle document upload
  onSubmit(): void {
    const newDocument = {
      documentType: this.documentType,
      uploadedBy: 'Architect', // In real app, you can get the logged-in user
      uploadDate: this.uploadDate,
      versionNumber: this.versionNumber,
    };
    this.documents.push(newDocument);
    alert('Document uploaded successfully!');
  }

  // Handle document download
  onDownload(document: any): void {
    // In real scenario, you would trigger a download from backend
    alert('Downloading document: ' + document.documentType);
  }

  // Handle document deletion
  onDelete(document: any): void {
    const index = this.documents.indexOf(document);
    if (index !== -1) {
      this.documents.splice(index, 1);
      alert('Document deleted successfully!');
    }
  }
}
