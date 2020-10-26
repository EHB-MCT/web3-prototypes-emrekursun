import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }
  authError: any;
  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  createUser(form){
    this.auth.createUser(form.value);
  }

}
