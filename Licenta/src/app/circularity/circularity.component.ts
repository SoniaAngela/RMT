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
  constructor(public dataService: DataService) { }

  ngOnInit() {
  }
  getCircularitySection(circParam) {
    this.dataService.getCitcularity(circParam).subscribe(
      (data: any) => {
        if (data) {
          this.circularity = data;
          console.log(this.circularity)

          console.log("loops tree")
          this.nodes =Array(this.circularity);
          console.log(Array(this.circularity))
          console.log(this.nodes)
        }
      }, (err: any) => {
        console.log(err)
      });

  }

}
