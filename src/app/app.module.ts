import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './shared/register/register.component';
import { ManagerDashboardComponent } from './features/project-manager/manager-dashboard/manager-dashboard.component';
import { CreateProjectComponent } from './features/project-manager/create-project/create-project.component';
import { ManageProjectsComponent } from './features/project-manager/manage-projects/manage-projects.component';
import { ProjectDetailsComponent } from './features/project-manager/project-details/project-details.component';
import { ManageBudgetComponent } from './features/project-manager/manage-budget/manage-budget.component';
import { ManageTasksComponent } from './features/project-manager/manage-tasks/manage-tasks.component';
import { ManageMaterialsComponent } from './features/project-manager/manage-materials/manage-materials.component';
import { ManageWorkforceComponent } from './features/site-supervisor/manage-workforce/manage-workforce.component';
import { DashboardComponent } from './features/site-supervisor/dashboard/dashboard.component';
import { TrackAttendanceComponent } from './features/site-supervisor/track-attendance/track-attendance.component';
import { ManageInspectionsComponent } from './features/site-supervisor/manage-inspections/manage-inspections.component';
import { ArchitectDashboardComponent } from './features/architect/architect-dashboard/architect-dashboard.component';
import { ManageDocumentsComponent } from './features/architect/manage-documents/manage-documents.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { VendorManagementComponent } from './features/project-manager/vendor-management/vendor-management.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainPageComponent,
    AdminDashboardComponent,
    LoginPageComponent,
    RegisterComponent,
    ManagerDashboardComponent,
    CreateProjectComponent,
    ManageProjectsComponent,
    ProjectDetailsComponent,
    ManageBudgetComponent,
    ManageTasksComponent,
    ManageMaterialsComponent,
    ManageWorkforceComponent,
    DashboardComponent,
    TrackAttendanceComponent,
    ManageInspectionsComponent,
    ArchitectDashboardComponent,
    ManageDocumentsComponent,
    VendorManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // This ensures all toasts will appear at the top right
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
