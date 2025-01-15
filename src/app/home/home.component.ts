import { Component, OnInit, ViewChild, model } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  selected = model<Date | null>(null);
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
 


}
