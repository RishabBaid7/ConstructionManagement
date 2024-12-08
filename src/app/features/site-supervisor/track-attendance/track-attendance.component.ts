import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-attendance',
  templateUrl: './track-attendance.component.html',
  styleUrls: ['./track-attendance.component.scss'],
})
export class TrackAttendanceComponent implements OnInit {
  workers = [
    {
      workerId: 101,
      name: 'John Doe',
      role: 'Electrician',
      attendanceStatus: 'Present',
    },
    {
      workerId: 102,
      name: 'Jane Smith',
      role: 'Plumber',
      attendanceStatus: 'Absent',
    },
    {
      workerId: 103,
      name: 'Alex Johnson',
      role: 'Carpenter',
      attendanceStatus: 'On Leave',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  submitAttendance(): void {
    console.log('Attendance submitted:', this.workers);
    alert('Attendance records have been successfully updated!');
    // Additional code to save attendance to the backend can be implemented here
  }
}
