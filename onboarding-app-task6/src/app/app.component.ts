import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { ChatService } from './chat.service';

const config = {
  apiKey: "AIzaSyDgrMH6KM9FuEnpIOkshcGxxeVpXsR1upk",
  authDomain: "task6onboarding.firebaseapp.com",
  databaseURL: "https://task6onboarding.firebaseio.com",
  projectId: "task6onboarding",
  storageBucket: "task6onboarding.appspot.com",
  messagingSenderId: "364969027507",
  appId: "1:364969027507:web:91a0adad73547f9f0b0dc6",
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onboarding-app-task6';

  constructor(public cs: ChatService) {}
}
