import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from './../data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';


const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      // alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }
    }
  }
};

@Component({
  selector: 'app-loop',
  templateUrl: './loop.component.html',
  styleUrls: ['./loop.component.css'],

})

export class LoopComponent {
  loops: Array<any>;
  currentItem: any;
  nodes: Array<any>;
  showBan = false;
  specificEl: any;
  scriptFiles: Array<any>;
  textareamodel: any;
  sumEx: any;
  scrFiles: any;
  isShow: any;
  showModel: any;
  minError: any;
  maxError: any;
  systemError: any;
  termError: any
  constructor(public dataService: DataService) {
    this.sumEx = "sum";
    this.getExamplesList(this.sumEx);
    this.isShow = 0;
    this.showModel = 0;
    this.textareamodel = this.getExample("search_default.rmt");
    this.minError=0;
    this.maxError=0;
    this.systemError=0;
    this.termError=0
  }

  getExamplesList(exampleList) {
    this.dataService.getExamplesList(exampleList).subscribe(
      (data: any) => {
        if (data) {
          this.scrFiles = data;
          this.scriptFiles = [];
          for (let i = 0; i < data.length; i++) {
            this.scriptFiles[i] = data[i].name;
          }
        }
      }, (err: any) => {
        console.log(err)
      });
  }

  //pt fisierul ales trebuie intors textul ca string si afisat in textarea
  getExample(file) {
    this.dataService.getExample(file).subscribe(
      (data: any) => {
        if (data) {
          this.textareamodel = data;
        }
      }, (err: any) => {
        console.log(err)
      });
  }

  showFiles() {
    this.isShow = this.isShow == 0 ? 1 : 0;
  }

  showExecution() {
    this.showModel = this.showModel == 0 ? 1 : 0;
  }
onSystemChange(){
  this.systemError=0
}
onMinChange(){
  this.minError=0
}
onMaxChange(){
  this.maxError=0
}
onTermChange(){
  this.termError=0
}
  getParamFct(loopParam, textArea, t1, t2, t3, btn) {
    if (loopParam && t1 && t2 && t3) {
      this.dataService.getSearch(loopParam, textArea, t1, t2, t3, btn).subscribe(
        (data: any) => {
          if (data) {
            this.loops = data;
            this.nodes = Array(this.loops);
          }
        }, (err: any) => {
          console.log(err)
        });
    }else{
      if(!loopParam){
        this.termError=1
      }
      if(!t1){
        this.minError=1
      }
      if(!t2){
        this.maxError=1
      }
      if(!t3){
        this.systemError=1
      }
    }
  }

  options: ITreeOptions = {
    actionMapping,
    isExpandedField: 'expanded',
  }
}

