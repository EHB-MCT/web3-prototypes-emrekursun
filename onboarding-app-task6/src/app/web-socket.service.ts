import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import * as firebase from "firebase";
import { map, catchError, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: SocketIOClient.Socket;

  getMessagesData() { 
    
    return this.db.collection("Messages").snapshotChanges();
  }

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
      this.socket = io.connect('http://localhost:3000');
  }

  listen(eventname: string) : Observable<any> {
      return new Observable((subscriber) => {
          this.socket.on(eventname, (data) => {
              subscriber.next(data);
          })
      })
  }

  emit(eventname: string, data: any) {
      this.socket.emit(eventname, data);
  }

  
}
