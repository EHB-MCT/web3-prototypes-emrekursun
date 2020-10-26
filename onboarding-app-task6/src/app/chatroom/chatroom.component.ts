import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { WebSocketService } from '../web-socket.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  userName: firebase.User;
  message: string;
  output: any[] = [];
  feedback: string;

  user: firebase.User;

  constructor(private auth: AuthService, private webSocketService: WebSocketService) { }
  ngOnInit(): void {
    this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));

    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })

  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);    
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }

  

}
