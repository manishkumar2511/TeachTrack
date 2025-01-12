import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersListComponent } from './list/teachers-list/teachers-list.component';
import { SubjectsListComponent } from './list/subjects-list/subjects-list.component';

const routes: Routes = [
  { path: 'teachers', title: 'teachers', component: TeachersListComponent },
  { path: 'subjects', title:'subjects', component: SubjectsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechTrackRoutingModule { }
