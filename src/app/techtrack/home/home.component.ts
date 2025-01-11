import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentService } from '../services/student.service';
import { Subject} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchTerm = '';
  text = '';
  timeout: any;
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'image', 'name', 'rollNumber', 'class', 'age', 'gender', 'email', 'contact', 'actions'
  ];

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource(students);
      console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onKeyUp(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.getStudentsByName(this.searchTerm);
    }, 500);

    this.text = this.searchTerm;
  }

  getStudentsByName(searchStudentName: string): void {
    this.studentService.getStudentsByName(searchStudentName).subscribe(students => {
      console.log(students);
      this.dataSource.data = students;
    });
  }

  openDialog(student?: any): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '600px',
      height: '500px',
      data: student || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (student) {
          const index = this.dataSource.data.findIndex(s => s.rollNumber === student.rollNumber);
          if (index !== -1) this.dataSource.data[index] = result;
        } else {
          this.dataSource.data.push(result);
        }
      }
    });
  }
}
