import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public auth:AuthService){
    
  }
  ngOnInit(): void {
    console.log((window as any).process )
  }
  title = 'clips';
}
