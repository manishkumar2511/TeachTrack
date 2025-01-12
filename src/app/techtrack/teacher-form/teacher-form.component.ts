import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../models/teacher';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  standalone: false,
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent implements OnInit {

  teacherForm!: FormGroup;
  isEditMode = false;
  selectedImage: File | null = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Teacher,
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private dialogRef: MatDialogRef<TeacherFormComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.teacherForm = this.fb.group({
      teacherd: [this.data?.teacherId],
      name: [this.data?.name || '', [Validators.required, Validators.minLength(3)]],
      age: [this.data?.age || '', [Validators.required]],
      gender: [this.data?.gender || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      contact: [this.data?.contact || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      image: [null],
      experience: [this.data?.experience || '', [Validators.required]],
      qualification: [this.data?.qualification || '', [Validators.required]],
      status: [this.data?.status || 'active']
    });
    this.isEditMode = !!this.data?.teacherId;

  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.teacherForm.patchValue({ studentImage: this.selectedImage });
      this.teacherForm.get('studentImage')?.updateValueAndValidity();
    }
  }


  saveTeacher(): void {
    if (this.teacherForm.valid) {
      const teachertData: Teacher = this.teacherForm.value;

      if (this.isEditMode) {
        this.teacherService.updateTeacher(teachertData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.teacherService.addTeacher(teachertData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
