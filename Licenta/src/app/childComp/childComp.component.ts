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
            alert(`context menu for ${node.data.leftTerm} => ${node.data.leftTerm}`);
        },
        dblClick: (tree, node, $event) => {
            if (node.hasChildren) {
                TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            }
        }
    }
};
@Component({
    selector: 'app-childComp',
    templateUrl: './childComp.component.html'
})
export class ChildComp {
    circularity: Array<any>;
    nodes: Array<any>;
    loops: any;
    item: any;
    newlastItem = [];
    lastItem: any;
    @Input() txt;
    @Input() system;
    @Input() circExec: Array<any>;
    @Input() currentItem: any;
    @Input() selectedMenu: any;
    @Input() rightTermsList: Array<any>
    @Input() leftTermsList: Array<any>

    @Output() sendLeftItem = new EventEmitter();
    @Output() sendRightItem = new EventEmitter();

    ngOnInit() {

        let length = this.currentItem.length;
        this.lastItem = this.currentItem[length - 1];
        if (this.currentItem)
            this.currentItem.forEach(element => {
                this.newlastItem.push(
                    element
                )
            });
    }

    constructor(public dataService: DataService) {
    }
    getCurentItem() {
        console.log("lastItem from getCurent Item")
        console.log(this.lastItem)
        return `circ${this.lastItem}`;
    }
    getProve(txt, system, leftTerm, rightTerm, btnName, btn) {
        this.dataService.getProve(txt, system, leftTerm, rightTerm, btnName, btn).subscribe(
            (data: any, ) => {
                if (data) {
                    this.loops = data;
                    this.nodes = Array(this.loops);
                }
            }, (err: any) => {
                console.log(err)
            });
    }
    getCirc(txt, system, leftTerm, rightTerm, btnName, btn) {
        let leftBr = "", rightBr = "";
        this.leftTermsList.forEach(term => {
            if (btnName == term.button) {
                leftBr = term.leftTerm;
            }
        });
        this.rightTermsList.forEach(term => {
            if (btnName == term.button) {
                rightBr = term.rightTerm;
            }
        });
            // console.log(system, leftTerm, rightTerm, btnName, btn, leftBr, rightBr)


        this.dataService.getCirc(txt, system, leftTerm, rightTerm, leftBr, rightBr, btn).subscribe(
            (data: any) => {
                if (data) {
                    this.loops = data;
                    this.nodes = Array(this.loops);
                }
            }, (err: any) => {
                console.log(err)
            });

        // console.log(this.selectedMenu);

    }
    changeLeftItem(leftTerm, id) {
        let button = this.getCurentItem();

        var leftJson = {
            btn: button,
            leftItem: leftTerm
        }
        console.log(leftJson)
        this.emitLeftItem(leftJson);
    }

    changeRightItem(rightTerm) {
        let button = this.getCurentItem();

        var rightJson = {
            btn: button,
            rightItem: rightTerm
        }
        this.emitRightItem(rightJson);
    }

    emitLeftItem($event) {
        this.sendLeftItem.emit($event);


    }

    emitRightItem($event) {
        this.sendRightItem.emit($event);

    }

}
