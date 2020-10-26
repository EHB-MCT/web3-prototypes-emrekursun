import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-daily-todo',
  templateUrl: './daily-todo.component.html',
  styleUrls: ['./daily-todo.component.css']
})
export class DailyTodoComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private dataTodo: TodoService) { }

  ngOnInit() {this.getTodoDataDaily();}
  todoList;   getTodoDataDaily = () => 
   this.dataTodo.getTodoDataDaily().subscribe(res =>(this.todoList = res));

}


