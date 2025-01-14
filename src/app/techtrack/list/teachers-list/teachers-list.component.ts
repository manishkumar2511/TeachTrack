import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from '../../services/teacher.service';
import { AlertDialogBoxComponent } from '../../helper/alert-dialog-box/alert-dialog-box.component';
import { AlertMessage } from '../../helper/alertMessage';
import { TeacherFormComponent } from '../../teacher-form/teacher-form.component';
import { Subject, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-teachers-list',
  standalone: false,
  
  templateUrl: './teachers-list.component.html',
  styleUrl: './teachers-list.component.css'
})
export class TeachersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 1000;
  searchTerm = '';
  text = '';
  timeout: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'image', 'name', 'age', 'email', 'subject', 'experience', 'qualification', 'gender', 'contact', 'status', 'actions'
  ];
  constructor(
    private dialog: MatDialog,
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.getTeachers();
    this.searchSubject.pipe(
      debounceTime(this.debounceTimeMs),
      filter(searchValue => searchValue.trim().length > 0)
    ).subscribe(searchValue => {
      this.getTeacherByName(searchValue);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.searchSubject.complete();
  }
  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.dataSource = new MatTableDataSource(teachers);
      console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  getTeacherByName(searchTeacherName: string): void {
    this.teacherService.getTeacherByName(searchTeacherName).subscribe(teacher => {
      this.dataSource.data = teacher;
    });
  }

  openTeacherFormDialog(): void {
    const dialogRef = this.dialog.open(TeacherFormComponent, {
      width: '600px',
      height: '500px',
    });
  }

  editTeacherRecord(teacherId: string) {
    this.teacherService.getTeacherById(teacherId).subscribe(teacher => {
      const dialogRef = this.dialog.open(TeacherFormComponent, {
        width: '600px',
        height: '500px',
        data: teacher
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getTeachers();
        }
      });
    });
  }

  deleteTeacherRecord(teacherId: string) {
    const dialogRef = this.dialog.open(AlertDialogBoxComponent, {
      data: {
        teacherId: teacherId,
        message: AlertMessage.DELETE_TEACHER,
        actionTitle: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTeachers();
      }
    });
  }

}
