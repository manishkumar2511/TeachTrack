import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  standalone: false,
  
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  selectedImage: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private fb: FormBuilder,
    private studentService: StudentService,
     private dialogRef: MatDialogRef<StudentFormComponent>
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      id: [this.data?.id],
      name: [this.data?.name || '', [Validators.required, Validators.minLength(3)]],
      age: [this.data?.age || '', [Validators.required, Validators.min(5), Validators.max(100)]],
      rollNumber: [this.data?.rollNumber || '', [Validators.required, Validators.pattern('^[0-9]{4,10}$')]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      studentImage: [null, Validators.required],
    });

    this.isEditMode = !!this.data?.id;
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.studentForm.patchValue({ studentImage: this.selectedImage });
      this.studentForm.get('studentImage')?.updateValueAndValidity();
    }
  }

  saveStudent(): void {
    debugger;
    if (this.studentForm.valid) {
      const studentData: Student = this.studentForm.value;

      if (this.isEditMode) {
        this.studentService.getStudentById(this.data.id!).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.studentService.addStudent(studentData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
