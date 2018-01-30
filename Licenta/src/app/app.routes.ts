import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {LoopComponent } from './loop/loop.component';
import { CircularityComponent } from './circularity/circularity.component';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'loop', component: LoopComponent},
    {path: 'circularity', component: CircularityComponent},
    {path: '**', component: HomeComponent}
  ];
  