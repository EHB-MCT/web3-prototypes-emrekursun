import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }

  chatroom() {
    this.router.navigate(['/chatroom']);
  }

  todo() {
    this.router.navigate(['/todo']);
  }

  dailyTodo() {
    this.router.navigate(['/dailyTodo']);
  }

  


}
