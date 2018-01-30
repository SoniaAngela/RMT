import { Injectable } from '@angular/core';
import { Http, XHRBackend, XHRConnection, Request, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';




// let content = "Prepare 2013 Marketing Plan: We need to double revenues in 2013 and our marketing strategy is going to be key here. R&D is improving existing Loops and creating new Loops so we can deliver great AV equipment to our customers.Robert, please make certain to create a PowerPoint presentation for the members of the executive team.";
// let tasks: string[] = ["Prepare 2016 Financial", "Prepare 2016 Marketing Plan", "Update Personnel Files", "Review Health Insurance Options Under the Affordable Care Act", "New Brochures", "2016 Brochure Designs", "Brochure Design Review", "Website Re-Design Plan", "Rollout of New Website and Marketing Brochures"];

// let loops: Loop[];

// export class Loop {
//     id: string;
//     name: string;
//     items?: Loop[];
// }


@Injectable()
export class DataService {
  headerGet: any;
  headerPost: any;
  headerDelete: any;
  sessionId: any;


 


//   getContent(){
//     return content;
// }
// getTasks() : string[] {
//     return tasks;
// }
// getLoops(): Loop[] {
//     return Loops;
// }
  constructor(private http: Http) {
    this.headerGet = { headers: new Headers({ 'Content-Type': 'application/json' }) };
    this.headerPost = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    this.headerDelete = { headers: new Headers({}) };
    this.sessionId = sessionStorage.getItem('user_token') ? JSON.parse(sessionStorage.getItem('user_token')).sessionId : null;
}

  // getUsers() {
  //   return this._http.get("/home")
  //     .map(result => this.result = result.json().data);
  // }

  // getLoop() {
  //   return this.http.get("/api/loop")
  //     .map(result => this.result = result.json().data);
    
  // }

   getLoop(loopParam) {
     const params = new URLSearchParams();
    // params.set('sessionId', this.sessionId);
    params.set('loopParam', loopParam)
    return this.http.post('api/loop', params, this.headerPost)
        .map((response: Response) => this.handleSuccess(response))
        .catch((error: Response) => this.handleError(error));
  }

  handleSuccess(response) {
    let result: any;
    try {
        result = response.json();
    } catch (e) {
        throw new Error('The server response is unsuported');
    }
    return result;
}
handleError(error) {
    let result: any;
    try {
        result = error.json();
    } catch (e) {
        throw new Error('The server response is unsuported');
    }
    return Observable.throw(error);
}

}
