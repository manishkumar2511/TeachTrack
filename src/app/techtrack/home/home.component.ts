import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  value = '';
  dataSource: any[] = [
    { image: 'https://via.placeholder.com/50', name: 'John Doe', class: '10th Grade', rollNumber: '12345' },
    { image: 'https://via.placeholder.com/50', name: 'Jane Smith', class: '9th Grade', rollNumber: '67890' },
    { image: 'https://via.placeholder.com/50', name: 'Alice Johnson', class: '8th Grade', rollNumber: '54321' },
    { image: 'https://via.placeholder.com/50', name: 'Bob Brown', class: '12th Grade', rollNumber: '98765' }
  ];

  displayedColumns: string[] = ['image', 'name', 'class', 'rollNumber', 'actions'];

  constructor(private dialog: MatDialog) { }

  openDialog(student?: any): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '500px',
      height: '400px',
      data: student || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (student) {
          // Update existing student
          const index = this.dataSource.findIndex(s => s.rollNumber === student.rollNumber);
          if (index !== -1) this.dataSource[index] = result;
        } else {
          // Add new student
          this.dataSource.push(result);
          console.log("data", this.dataSource);
        }
      }
    });
  }
}
