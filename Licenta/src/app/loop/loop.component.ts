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
      alert(`context menu for ${node.data.name}`);
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
  constructor(public dataService: DataService) {
  }



  // @ViewChild('tree') tree;
  // @ViewChild('tree') treeComponent: TreeComponent;

  // ngAfterViewInit() {
  //   this.tree.treeModel.expandAll();
  //   const treeModel:TreeModel = this.treeComponent.treeModel;
  //   const firstNode:TreeNode = treeModel.getFirstRoot();

  //   firstNode.setActiveAndVisible();
  // }

  getLoopSection(loopParam) {
    this.dataService.getLoop(loopParam).subscribe(
      (data: any) => {
        if (data) {
          this.loops = data;
          console.log(this.loops)

          console.log(" loops tree")
          this.nodes = Array(this.loops);
          console.log(Array(this.loops))
          console.log(this.nodes)
        }
      }, (err: any) => {
        console.log(err)
      });

  }
  options: ITreeOptions = {
    actionMapping,
    isExpandedField: 'expanded',



  }
}

