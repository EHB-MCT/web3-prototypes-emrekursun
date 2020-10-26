import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: firebase.User;

  constructor(private dataUsers: ChatService , private auth: AuthService) { }

   // tslint:disable-next-line: align
   ngOnInit() {this.getUsersData();}
   usersList;   getUsersData = () => 
    this.dataUsers.getUsersData().subscribe(res =>(this.usersList = res));

}
