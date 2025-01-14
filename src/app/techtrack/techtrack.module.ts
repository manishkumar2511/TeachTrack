import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechTrackRoutingModule } from './techtrack-routing.module';
import { TeachersListComponent } from './list/teachers-list/teachers-list.component';
import { SubjectsListComponent } from './list/subjects-list/subjects-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentFormComponent } from './student-form/student-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertDialogBoxComponent } from './helper/alert-dialog-box/alert-dialog-box.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { MatSelectModule } from '@angular/material/select';
import { StudentListComponent } from './list/student-list/student-list.component';


@NgModule({
  declarations: [
    TeachersListComponent,
    SubjectsListComponent,
    StudentFormComponent,
    StudentListComponent,
    AlertDialogBoxComponent,
    SubjectFormComponent,
    TeacherFormComponent
   
    
  ],
  providers: [StudentService],
  imports: [
    CommonModule,
    TechTrackRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule


  ]
})
export class TechtrackModule { }
