import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  user: firebase.User;

  constructor(private auth: AuthService, private router: Router, private dataTodo: TodoService) { }

  ngOnInit() {this.getTodoData();}
  todoList;   getTodoData = () => 
   this.dataTodo.getTodoData().subscribe(res =>(this.todoList = res));

}


