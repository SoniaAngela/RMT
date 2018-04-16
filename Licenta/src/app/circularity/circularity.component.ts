import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from './../data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-circularity',
  templateUrl: './circularity.component.html',
  styleUrls: ['./circularity.component.css']
})
export class CircularityComponent implements OnInit {
  circularity: Array<any>;
  currentItem: any;
  nodes: Array<any>;
  components: Array<any>;
  index:any;
  constructor(public dataService: DataService) {
    this.index=0;
  }

  ngOnInit() {
  }

  addComponent() {
 
    if(this.index==0){
      this.components=[this.index];
      this.index++;

      
    }else{
      this.index++;
      this.components.push(this.index);
    }
  }
  removeComponent(comp){
    this.components.forEach( (item, index) => {
      if(item === comp) this.components.splice(index,1);
    });
 }
}
