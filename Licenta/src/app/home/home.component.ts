import { Component, OnInit } from '@angular/core';
// Import the DataService
import { DataService } from './../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

   // Define a users property to hold our user data
   users: Array <any>;
   
     // Create an instance of the DataService through dependency injection
     constructor(private _dataService: DataService) {
   
       // Access the Data Service's getUsers() method we defined
      //  this._dataService.getUsers()
      //      .subscribe(res => this.users = res);
     }
}
