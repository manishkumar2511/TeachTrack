import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
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


@NgModule({
  declarations: [
    HomeComponent,
    TeachersListComponent,
    SubjectsListComponent,
    StudentFormComponent,
    
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
    MatTooltipModule


  ]
})
export class TechtrackModule { }
