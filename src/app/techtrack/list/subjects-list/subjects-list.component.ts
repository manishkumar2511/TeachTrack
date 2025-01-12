import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from '../../services/subject.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertDialogBoxComponent } from '../../helper/alert-dialog-box/alert-dialog-box.component';
import { SubjectFormComponent } from '../../subject-form/subject-form.component';

@Component({
  selector: 'app-subjects-list',
  standalone: false,
  
  templateUrl: './subjects-list.component.html',
  styleUrl: './subjects-list.component.css'
})
export class SubjectsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  searchTerm = '';
  timeout: any;

  displayedColumns: string[] = ['name', 'className', 'languages', 'actions'];
  constructor(
    private dialog: MatDialog,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe(subjects => {
      this.dataSource = new MatTableDataSource(subjects);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onKeyUp(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.getSubjectsByName(this.searchTerm);
    }, 500);
  }

  getSubjectsByName(searchSubjectName: string): void {
    this.subjectService.getSubjectByName(searchSubjectName).subscribe(subjects => {
      this.dataSource.data = subjects;
    });
  }

  openSubjectFormDialog(student?: any): void {
    const dialogRef = this.dialog.open(SubjectFormComponent, {
      width: '500px',
      height: '300px',
    });
  }

  editSubjectRecord(studentId: string) {
    this.subjectService.getSubjectById(studentId).subscribe(subject => {
      const dialogRef = this.dialog.open(SubjectFormComponent, {
        width: '500px',
        height: '300px',
        data: subject
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getSubjects();
        }
      });
    });
  }

  deleteSubjetRecord(subjectId: string) {
    const dialogRef = this.dialog.open(AlertDialogBoxComponent, {
      data: {
        subjectId: subjectId,
        message: 'Are you sure you want to delete this subject?',
        actionTitle: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSubjects();
      }
    });
  }


}
