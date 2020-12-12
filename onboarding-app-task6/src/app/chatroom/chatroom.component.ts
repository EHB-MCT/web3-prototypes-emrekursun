import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { WebSocketService } from '../web-socket.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as firebase from "firebase";
import { map, catchError, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  userName: firebase.User;
  message: string;
  messages: any[] = [];
  output: any[] = [];
  feedback: string;
  doc$: Observable<any>;
  collection = 'Messages';
  docId = 'history';
  user: firebase.User;

  constructor(private auth: AuthService, private webSocketService: WebSocketService, private db: AngularFirestore, private router: Router, private dataTodo: WebSocketService) {
    this.doc$ = db.collection(this.collection).doc(this.docId).valueChanges();
   }
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
    
    let chat_history = {
      message : this.message,
      handle : this.userName
    };

    this.db.doc(`Messages/history`).update({
      Messages : firebase.firestore.FieldValue.arrayUnion({
         message: this.message,
         username: this.userName
      })
  });
      
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
