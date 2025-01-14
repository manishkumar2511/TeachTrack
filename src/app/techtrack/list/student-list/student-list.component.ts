import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, filter } from 'rxjs';
import { AlertDialogBoxComponent } from '../../helper/alert-dialog-box/alert-dialog-box.component';
import { AlertMessage } from '../../helper/alertMessage';
import { StudentService } from '../../services/student.service';
import { StudentFormComponent } from '../../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  standalone: false,
  
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 1000;
  searchTerm = '';
  text = '';
  timeout: any;
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'image', 'name', 'rollNumber', 'class', 'age', 'gender', 'email', 'contact', 'status', 'actions'
  ];

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getStudents();
    this.searchSubject.pipe(
      debounceTime(this.debounceTimeMs),
      filter(searchValue => searchValue.trim().length > 0)
    ).subscribe(searchValue => {
      this.getStudentsByName(searchValue);
    });
  }
  ngOnDestroy() {
    this.searchSubject.complete();
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
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

  getStudentsByName(searchStudentName: string): void {
    this.studentService.getStudentsByName(searchStudentName).subscribe(students => {
      console.log(students);
      this.dataSource.data = students;
    });
  }

  openStudentFormDialog(student?: any): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '600px',
      height: '500px',
    });
  }

  editStudentRecord(studentId: string) {
    this.studentService.getStudentById(studentId).subscribe(student => {
      const dialogRef = this.dialog.open(StudentFormComponent, {
        width: '600px',
        height: '500px',
        data: student
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getStudents();
        }
      });
    });
  }

  deleteStudentRecord(studentId: string) {
    const dialogRef = this.dialog.open(AlertDialogBoxComponent, {
      data: {
        studentId: studentId,
        message: AlertMessage.DELETE_STUDENT,
        actionTitle: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getStudents();
      }
    });
  }
}
