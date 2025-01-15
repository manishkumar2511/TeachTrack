import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatListModule
    
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
