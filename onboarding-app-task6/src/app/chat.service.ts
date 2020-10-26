import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  getUsersData() { 
    return this.firestore.collection("Users").snapshotChanges();
  }

  constructor(private firestore: AngularFirestore) { }
}
