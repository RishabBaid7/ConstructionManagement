import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './shared/register/register.component';
import { ManagerDashboardComponent } from './features/project-manager/manager-dashboard/manager-dashboard.component';
import { CreateProjectComponent } from './features/project-manager/create-project/create-project.component';
import { ManageProjectsComponent } from './features/project-manager/manage-projects/manage-projects.component';
import { ProjectDetailsComponent } from './features/project-manager/project-details/project-details.component';
import { ManageBudgetComponent } from './features/project-manager/manage-budget/manage-budget.component';
import { ManageTasksComponent } from './features/project-manager/manage-tasks/manage-tasks.component';
import { ManageMaterialsComponent } from './features/project-manager/manage-materials/manage-materials.component';
import { DashboardComponent } from './features/site-supervisor/dashboard/dashboard.component';
import { ManageWorkforceComponent } from './features/site-supervisor/manage-workforce/manage-workforce.component';
import { TrackAttendanceComponent } from './features/site-supervisor/track-attendance/track-attendance.component';
import { ManageInspectionsComponent } from './features/site-supervisor/manage-inspections/manage-inspections.component';
import { ArchitectDashboardComponent } from './features/architect/architect-dashboard/architect-dashboard.component';
import { ManageDocumentsComponent } from './features/architect/manage-documents/manage-documents.component';
import { VendorManagementComponent } from './features/project-manager/vendor-management/vendor-management.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'manager-dashboard',
    component: ManagerDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager'] },
  },
  {
    path: 'manager/create-project',
    component: CreateProjectComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager'] },
  },
  {
    path: 'manager/manage-projects',
    component: ManageProjectsComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager'] },
  },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager', 'Supervisor', 'Architect', 'Engineer'] },
  },
  {
    path: 'project/:id/manage-budget',
    component: ManageBudgetComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager'] },
  },
  {
    path: 'project/:id/manage-tasks',
    component: ManageTasksComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager'] },
  },
  {
    path: 'project/:id/manage-materials',
    component: ManageMaterialsComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager'] },
  },

  {
    path: 'supervisor-dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['Supervisor'] },
  },
  {
    path: 'site-supervisor/manage-workforce',
    component: ManageWorkforceComponent,
    canActivate: [authGuard],
    data: { roles: ['Supervisor'] },
  },
  {
    path: 'site-supervisor/manage-attendance',
    component: TrackAttendanceComponent,
    canActivate: [authGuard],
    data: { roles: ['Supervisor'] },
  },
  {
    path: 'site-supervisor/manage-inspections',
    component: ManageInspectionsComponent,
    canActivate: [authGuard],
    data: { roles: ['Supervisor'] },
  },
  {
    path: 'architect-dashboard',
    component: ArchitectDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['Architect'] },
  },
  {
    path: 'architect/manage-documents',
    component: ManageDocumentsComponent,
    canActivate: [authGuard],
    data: { roles: ['Architect'] },
  },
  {
    path: 'manager/vendors',
    component: VendorManagementComponent,
    canActivate: [authGuard],
    data: { roles: ['ProjectManager'] },
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
