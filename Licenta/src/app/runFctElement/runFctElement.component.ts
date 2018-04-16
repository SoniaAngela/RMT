import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
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
    selector: 'app-runFctElement',
    templateUrl: './runFctElement.component.html'
})
export class RunFctElementComponent {
    circularity: Array<any>;
    currentItem: any;
    nodes: Array<any>;
    loops: any;

    @Input() txt;
    constructor(public dataService: DataService) { }

    getParamFct(loopParam, textArea, t1, t2, t3, btn) {
        let hasChildrenNo = 0;
        this.dataService.getFct(loopParam, textArea, t1, t2, t3, btn).subscribe(
            (data: any) => {
                if (data) {
                    this.loops = data;
                    this.nodes = Array(this.loops);
                }
            }, (err: any) => {
                console.log(err)
            });
    }
}
