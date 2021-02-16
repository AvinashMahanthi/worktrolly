import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  sprintName:string

  constructor(public router: Router, public authService: AuthService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getCurrentSprint().subscribe(data => {
      this.sprintName = "S" +  data.CurrentSprintId;
  })
  }
  startNewSprint() {
    this.router.navigate(['/StartNewSprint']);
  }

  startNewSession() {
    this.router.navigate(['/CreateNewSession']);
  }

  Board(){
    this.router.navigate(['/Board',this.sprintName]);
  }

  myDashBoard(){
    this.router.navigate(["/"])
  }
}
