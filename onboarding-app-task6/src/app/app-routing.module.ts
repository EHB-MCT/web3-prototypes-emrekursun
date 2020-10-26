import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { DailyTodoComponent } from './daily-todo/daily-todo.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);



const routes: Routes = [{

  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent,
},
{
  path: 'home',
  component: HomeComponent,
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: 'todo',
  component: TodoComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }
},
{ path: 'chatroom', 
component: ChatroomComponent, 
canActivate: [AngularFireAuthGuard], 
data: { authGuardPipe: redirectUnauthorizedToLogin } 
},
{ path: 'dailyTodo', 
component: DailyTodoComponent, 
canActivate: [AngularFireAuthGuard], 
data: { authGuardPipe: redirectUnauthorizedToLogin } 
}
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
