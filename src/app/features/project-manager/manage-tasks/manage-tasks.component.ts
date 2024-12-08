import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent implements OnInit {
  tasks: any[] = [];
  showAddTaskForm = false;
  projectId: string = '';
  newTask = {
    id: '',
    taskName: '',
    assignedToName: '',
    priority: 'Low',
    startDate: '',
    endDate: '',
    status: 'Not Started', // Default status
  };

  token = localStorage.getItem('token'); // Securely fetch the token

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract projectId from the URL
    this.projectId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.projectId) {
      console.error('Project ID not found in URL.');
      return;
    }

    this.fetchTasks();
  }

  fetchTasks() {
    this.http
      .get<any>(`https://localhost:7050/api/Task/all?projectId=${this.projectId}`, {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe(
        (response) => {
          this.tasks = response.tasks || []; // Adjust based on response structure
        },
        (error) => console.error('Error fetching tasks:', error)
      );
  }

  addTask(): void {
    const taskToSend = {
      ...this.newTask,
      assignedTo: this.newTask.assignedToName, // Map the field for the backend
      projectId: this.projectId, // Include projectId in the request
    };

    this.http
      .post('https://localhost:7050/api/Task/create', taskToSend, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .subscribe(
        (response: any) => {
          this.tasks.push(response.tasks); // Adjust based on response structure
          this.newTask = {
            id: '',
            taskName: '',
            assignedToName: '',
            priority: 'Low',
            startDate: '',
            endDate: '',
            status: 'Not Started', // Reset to default
          };
          this.showAddTaskForm = false;
          this.fetchTasks();
        },
        (error) => console.error('Error adding task:', error)
      );
  }

  editTask(task: any): void {
    alert(`Editing task: ${task.taskName}`);
    // Implement edit logic here
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      const token = localStorage.getItem('token');
    
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
    
      // Call backend API to delete the task
      this.http
        .delete(`https://localhost:7050/api/Task/${taskId}`, {
          headers: new HttpHeaders({
            accept: '*/*',
            Authorization: `Bearer ${token}`, // Add token dynamically
          }),
          responseType: 'text', // Expect a plain text response
        })
        .subscribe(
          (response) => {
            console.log(response); // Log the plain text response
            // Remove task from UI after successful deletion
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
            // alert('Task deleted successfully.');
          },
          (error) => {
            console.error('Error deleting task:', error);
            alert('Failed to delete the task. Please try again.');
          }
        );
    }
  }
  
}
