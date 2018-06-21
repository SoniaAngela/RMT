import { Injectable } from '@angular/core';
import { Http, XHRBackend, XHRConnection, Request, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
    headerGet: any;
    headerPost: any;
    headerDelete: any;
    sessionId: any;
    constructor(private http: Http) {
        this.headerGet = { headers: new Headers({ 'Content-Type': 'application/json' }) };
        this.headerPost = { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
        this.headerDelete = { headers: new Headers({}) };
        this.sessionId = sessionStorage.getItem('user_token') ? JSON.parse(sessionStorage.getItem('user_token')).sessionId : null;
    }

    // getLoop(loopParam) {
    //     const params = new URLSearchParams();
    //     // params.set('sessionId', this.sessionId);
    //     params.set('loopParam', loopParam)
    //     return this.http.post('api/loop', params, this.headerPost)
    //         .map((response: Response) => this.handleSuccess(response))
    //         .catch((error: Response) => this.handleError(error));
    // }


    getSearch(loopParam, textArea, t1, t2, t3, btn) {
        const params = new URLSearchParams();
        // params.set('sessionId', this.sessionId);
        params.set('loopParam', loopParam);
        params.set('textArea', textArea);
        params.set('t1', t1);
        params.set('t2', t2);
        params.set('t3', t3);
        params.set('btn', btn);

        return this.http.post('api/search', params, this.headerPost)
            .map((response: Response) => this.handleSuccess(response))
            .catch((error: Response) => this.handleError(error));
    }

    getProve(txt, system, leftTerm, rightTerm, btnName, btn) {

        const params = new URLSearchParams();
        // params.set('sessionId', this.sessionId);
        params.set('leftTerm', leftTerm);
        params.set('rightTerm', rightTerm);
        params.set('textArea', txt);
        params.set('btnName', btnName);
        params.set('btn', btn);
        params.set('system', system);

        return this.http.post('api/prove', params, this.headerPost)
            .map((response: Response) => this.handleSuccess(response))
            .catch((error: Response) => this.handleError(error));
    }


    getCirc(txt, system, leftTerm, rightTerm, leftBtnTerm, rightBtnTerm, btn) {
        const params = new URLSearchParams();
        // params.set('sessionId', this.sessionId);
        params.set('leftTerm', leftTerm);
        params.set('rightTerm', rightTerm);
        params.set('textArea', txt);
        params.set('leftBtnTerm', leftBtnTerm);
        params.set('rightBtnTerm', rightBtnTerm);
        params.set('btn', btn);
        params.set('system', system);

        return this.http.post('api/circ', params, this.headerPost)
            .map((response: Response) => this.handleSuccess(response))
            .catch((error: Response) => this.handleError(error));

    }

    // getCitcularity(circParam) {
    //     const params = new URLSearchParams();
    //     // params.set('sessionId', this.sessionId);
    //     params.set('circParam', circParam)
    //     return this.http.post('api/prove', params, this.headerPost)
    //         .map((response: Response) => this.handleSuccess(response))
    //         .catch((error: Response) => this.handleError(error));
    // }
    getExample(file) {
        console.log("aici")
        const params = new URLSearchParams();
        params.set('file', file)
        return this.http.post('api/exampleContent', params, this.headerPost)
            .map((response: Response) => this.handleSuccess(response))
            .catch((error: Response) => this.handleError(error));
    }


    getExamplesList(exampleList) {
        const params = new URLSearchParams();
        params.set('examplesList', exampleList)
        return this.http.post('api/examplesList', params, this.headerPost)
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
