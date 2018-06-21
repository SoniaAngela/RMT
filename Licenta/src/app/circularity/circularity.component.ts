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
  index: any;
  specificEl: any;
  scriptFiles: Array<any>;
  textareamodel: any;
  sumEx: any;
  scrFiles: any;
  isShow: any;
  showCirc: any;
  // circIndex: Array<any>;
  circExec: Array<any>;
  selectedMenu: Array<any>;
  leftTermsList: Array<any>;
  rightTermsList: Array<any>;

  constructor(public dataService: DataService) {
    this.index = 1;
    this.sumEx = "sum";
    this.getExamplesList(this.sumEx);
    this.isShow = 0;
    this.showCirc = 0
    this.textareamodel = this.getExample("prove_default.rmt");
    this.circExec = [{
      button: null,
      leftTerm: null,
      rightTerm: null,
      circIndex: null,
      leftId: null,
      rightId: null,
      btnId: null
    }]
    this.currentItem = [];
    this.leftTermsList = [{
      button: null,
      leftTerm: null,
    }]
    this.rightTermsList = [{
      button: null,
      rightTerm: null
    }]
  }


  ngOnInit() {
  }

  //trebuie luate numele fisierelor din folder si afisate
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

  addComponent() {
    if (this.index === 1) {
      // this.components = [this.index];
      // this.circIndex = ["Circ " + this.index]; button: null,

      this.circExec = [{
        button: `Circ ${this.index}`,
        leftTerm: "",
        rightTerm: "",
        circIndex: this.index,
        leftId: `leftCirc${this.index}`,
        rightId: `leftCic${this.index}`,
        btnId: `circ${this.index}`

      }]

      this.currentItem.push(`${this.index}`);

      this.index++;
    } else {
      // this.components.push(this.index);
      // this.circIndex.push("Circ " + this.index);

      //   this.index++;

      // console.log(this.circIndex)

      this.circExec.push({
        button: `Circ ${this.index}`,
        leftTerm: "",
        rightTerm: "",
        circIndex: this.index,
        leftId: `leftCirc${this.index}`,
        rightId: `leftCic${this.index}`,
        btnId: `circ${this.index}`
      })

      this.currentItem.push(`${this.index}`);

      this.index++;
    }
    this.showCirc = 1;
  }

  createList(item,name) {
    if(name==="left"){
      let isFind = false;
      if (item.btn != null) {
        if (this.leftTermsList[0].button == null) {
          this.leftTermsList = [{
            button: item.btn,
            leftTerm: item.leftItem,
          }]
        } else {
          this.leftTermsList.forEach(element => {
            this.leftTermsList.forEach(term => {
              // console.log(item)
              if (element.button === term.button && term.button === item.btn) {
                element.leftTerm = item.leftItem;
                isFind = true;
              }
            })
            if (!isFind) {
              this.leftTermsList.push(
                {
                  button: item.btn,
                  leftTerm: item.leftItem,
                }
              )
              isFind =true;
            }
          });
        }
      }
    }
    if(name==="right"){
      let isFind = false;
      if (item.btn != null) {
        if (this.rightTermsList[0].button == null) {
          this.rightTermsList = [{
            button: item.btn,
            rightTerm: item.rightItem,
          }]
        } else {
          this.rightTermsList.forEach(element => {
            this.rightTermsList.forEach(term => {
              if (element.button === term.button && term.button === item.btn) {
                element.rightTerm = item.rightItem;
                isFind = true;
              }
            })
            if (!isFind) {
              this.rightTermsList.push(
                {
                  button: item.btn,
                  rightTerm: item.rightItem,
                }
              )
              isFind =true;
            }
          });
        }
      }
    }
    console.log(this.rightTermsList)
  }
  getLeftItem(event) {
    // console.log("left", event)
    this.createList(event,"left");
  }
  getRightItem(event) {
    // console.log("right", event)
    this.createList(event,"right");

  }

  removeComponent(comp) {
    this.circExec.forEach((item, index) => {
      if (item === comp) {
        // this.components.splice(index, 1);
        // this.circIndex.splice(index, 1);
        // console.log(this.circIndex)

        this.circExec.splice(index, 1);
        this.currentItem.splice(index, 1);
      };
    });
  }
}
