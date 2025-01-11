import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-alert-dialog-box',
  standalone: false,
  
  templateUrl: './alert-dialog-box.component.html',
  styleUrl: './alert-dialog-box.component.css'
})
export class AlertDialogBoxComponent {
  message?: string;
  actionTitle?: string;
  studentId?: string;
  subjectId?: string;
  teacherId?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private studentService: StudentService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,

    private dialogRef: MatDialogRef<AlertDialogBoxComponent>
  ) {
    this.message = data.message 
    this.actionTitle = data.actionTitle 
    this.studentId = data.studentId; 
  }

  confirmAction(): void {
    debugger;
    if (this.actionTitle?.toLowerCase() === 'delete') {
      const deleteObservable = this.studentId
        ? this.studentService.deleteStudent(this.studentId)
        : this.subjectId
          ? this.subjectService.deleteSubject(this.subjectId)
          : this.teacherId
            ? this.teacherService.deleteTeacher(this.teacherId)
            : null;

      if (deleteObservable) {
        deleteObservable.subscribe(() => {
          this.dialogRef.close(true);
          this.refreshTableData(); 
        }, () => {
          this.dialogRef.close(false);
        });
      } else {
        this.dialogRef.close(true); 
      }
    } else {
      this.dialogRef.close(true); 
    }
  }

  cancelAction(): void {
    this.dialogRef.close(true); 
  }

  // helper mwethod
  refreshTableData(): void {
    const dataObservable = this.studentId
      ? this.studentService.getStudents()
      : this.subjectId
        ? this.subjectService.getSubjects()
        : this.teacherId
          ? this.teacherService.getTeachers()
          : null;
  }
}