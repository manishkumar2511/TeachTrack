import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-subject-form',
  standalone: false,

  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.css'
})
export class SubjectFormComponent implements OnInit {
  subjectForm!: FormGroup;
  isEditMode = false;
  availableLanguages: string[] = ['English', 'Spanish', 'French', 'German', 'Mandarin'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Subject,
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private dialogRef: MatDialogRef<SubjectFormComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.subjectForm = this.fb.group({
      subjectId: [this.data?.subjectId],
      name: [this.data?.name ||'', [Validators.required, Validators.minLength(3)]],
      className: [this.data?.className || '', [Validators.required]],
      languages: [this.data?.languages || [], [Validators.required, Validators.minLength(1)]]
    });
    this.isEditMode = !!this.data?.subjectId;

  }

 

  saveSubject(): void {
    if (this.subjectForm.valid) {
      const subjectData: Subject = this.subjectForm.value;

      if (this.isEditMode) {
        this.subjectService.updateSubject(subjectData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.subjectService.addSubject(subjectData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
