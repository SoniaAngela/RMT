import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import {Routes, RouterModule, Router} from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoopComponent } from './loop/loop.component';
import { CircularityComponent } from './circularity/circularity.component';
import { HttpClientModule} from '@angular/common/http';
import { ROUTES } from './app.routes';
import { DataListComponent } from './data-list/data-list.component';
import { TreeModule, TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeComponent } from 'angular-tree-component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoopComponent,
    CircularityComponent,
    DataListComponent
   
  ],
  imports: [
    BrowserModule,
    HttpModule,              // <-Add HttpModule
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {useHash: false}),
    TreeModule,],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
