import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './techtrack/home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',title:'home', component: HomeComponent },   
  { path: 'techtrack', loadChildren: () => import('./techtrack/techtrack.module').then(m => m.TechtrackModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
