import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashBoardComponent implements OnInit {
  user: User
  username: string

  userObservable: Observable<User>

  currentSprintNumber: number;
  currentSprintName: string;

  constructor(public router: Router, public authService: AuthService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.currentSprintName =this.backendService.currentSprintName
    this.readUser();
  }
  readUser() {
    this.userObservable = this.authService.afauth.user.pipe(map(action => {
      const data = action as User;
      this.user = data;
      if (data == null && this.currentSprintName!==undefined) {
        this.router.navigate(['/Board',this.currentSprintName]);
      }
      this.username = data.displayName;
      return { ...data }
    }));
  }
}
