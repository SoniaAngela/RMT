import {NgModule, Component, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import {Routes, RouterModule, Router} from "@angular/router";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  // constructor(private router: Router) {} 

  // goHome() {
  //   this.router.navigate(['']); 
  // }

  // goLoop() {
  //   this.router.navigate(['loop']); 
  // }

  // goCircularity() {
  //   this.router.navigate(['circularity']); 
  // }
}
