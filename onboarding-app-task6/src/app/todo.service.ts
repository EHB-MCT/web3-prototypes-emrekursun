import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
  
})


export class TodoService {

  

  getTodoData() { 
    return this.firestore.collection("todo").snapshotChanges();
  }

  getTodoDataDaily() { 
    
    var currentDate = new Date(); 
    var cValue = formatDate(currentDate, 'dd', 'fr-FR');
    console.log(cValue);
    return this.firestore.collection("todo", ref => ref.where('dag', '==', cValue)).snapshotChanges();
  }



  constructor(private firestore: AngularFirestore) { }
}
