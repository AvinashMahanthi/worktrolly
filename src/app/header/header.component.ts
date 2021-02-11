import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardComponent } from '../body/board/board.component';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService, public backendService: BackendService) { }

  ngOnInit(): void {
  }

  startNewSprint() {
    this.router.navigate(['/StartNewSprint']);
  }

  startNewSession() {
    this.router.navigate(['/CreateNewSession']);
  }

  Board(){
    this.router.navigate(['/Board',this.backendService.currentSprintName]);
  }

  myDashBoard(){
    this.router.navigate(["/"])
  }
}
