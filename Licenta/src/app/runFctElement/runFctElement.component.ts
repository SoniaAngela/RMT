// import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
// import { DataService } from './../data.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Http, Headers, URLSearchParams } from '@angular/http';
// import { map } from 'rxjs/operators';
// import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';



// const actionMapping: IActionMapping = {
//     mouse: {
//         contextMenu: (tree, node, $event) => {
//             $event.preventDefault();
//             alert(`context menu for ${node.data.name}`);
//         },
//         dblClick: (tree, node, $event) => {
//             if (node.hasChildren) {
//                 TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
//             }
//         }
//     }
// };
// @Component({
//     selector: 'app-runFctElement',
//     templateUrl: './runFctElement.component.html'
// })
// export class RunFctElementComponent {
//     circularity: Array<any>;
//     currentItem: any;
//     nodes: Array<any>;
//     loops: any;

//     @Input() txt;
//     @Input() system;
//     @Input() leftBtn;
//     @Input() rigtBtn;
//     @Input() circExec: Array<any>;
//     @Input() terms;

//     @Output() leftTerm = new EventEmitter<any>();
//     @Output() rightTerm = new EventEmitter<any>();


//     constructor(public dataService: DataService) { }


//     getProve(txt, system, leftTerm, rightTerm, btnName, btn) {
//         let hasChildrenNo = 0;
//         this.dataService.getProve(txt, system, leftTerm, rightTerm, btnName, btn).subscribe(
//             (data: any, ) => {
//                 if (data) {
//                     this.loops = data;
//                     this.nodes = Array(this.loops);
//                 }
//             }, (err: any) => {
//                 console.log(err)
//             });
//     }
//     getCirc(txt, system, leftTerm, rightTerm, btnName, leftBtnTerm, rightBtnTerm, btn) {
//         let hasChildrenNo = 0;
//         this.dataService.getCirc(txt, system, leftTerm, rightTerm, btnName, leftBtnTerm, rightBtnTerm, btn).subscribe(
//             (data: any) => {
//                 if (data) {
//                     this.loops = data;
//                     this.nodes = Array(this.loops);
//                 }
//             }, (err: any) => {
//                 console.log(err)
//             });
//     }
// }
