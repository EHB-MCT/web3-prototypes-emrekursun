import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import * as firebase from "firebase";
import { map, catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  userLogged: firebase.User;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
    console.log('let there be presence');
    this.updateOnUser().subscribe();
   
    
   }

   getPresence(uid: string) {
    return this.db.doc(`status/${uid}`).valueChanges();
  }

  getUser() {
    return this.afAuth.authState.pipe().toPromise();
  }

  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.db.doc(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }


  updateOnUser() {
    const connection = this.db.doc('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );

    return this.afAuth.authState.pipe(
      switchMap(user =>  user ? connection : of('offline')),
      tap(status => this.setPresence(status))
    );
  }

  


  getUserState() {
    return this.afAuth.authState;
   
  }

  login( email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          
          this.router.navigate(['/todo']);
        }
      
      })
  }

  createUser(user) {
     this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then( userCredential => {
       this.newUser = user;
       

       userCredential.user.updateProfile({
         displayName: user.firstName + ' ' + user.lastName,
       });

       this.insertUserData(userCredential)
       .then(() => {
         this.router.navigate(['/todo']);
         
       });
      })

      .catch( error => {
        this.eventAuthError.next(error);
      });
    }

       insertUserData(userCredential: firebase.auth.UserCredential){
       return this.db.doc(`Users/${userCredential.user.uid}`).set({
        email: this.newUser.email,
        firstname: this.newUser.firstName,
        lastname: this.newUser.lastName,
        status: "online",
        })
       }  

       logout() {
        this.setPresence('offline');
        this.afAuth.signOut();
        this.router.navigate(['/home']);
        
      }

      

     }
