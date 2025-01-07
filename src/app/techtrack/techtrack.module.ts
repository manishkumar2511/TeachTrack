import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TechTrackRoutingModule } from './techtrack-routing.module';
import { TeachersListComponent } from './list/teachers-list/teachers-list.component';
import { SubjectsListComponent } from './list/subjects-list/subjects-list.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    TeachersListComponent,
    SubjectsListComponent,
    
  ],
  imports: [
    CommonModule,
    TechTrackRoutingModule,
    MatButtonModule,
  ]
})
export class TechtrackModule { }
