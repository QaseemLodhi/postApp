import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class PostService {
    constructor(private http: Http, private config: AppConfig) { }

    createPost(value: any) {

        let Obj = {
            postTitle: value.postTitle,
            postCategory: value.postCategory,
            postDescription: value.postDescription,
            userId:value.userId
        }
        return this.http.post(this.config.apiUrl + '/post/addPost', Obj, this.jwt())
            .map((response: Response) => {
                let postData = response.json();
                if (postData) {
                    return postData;
                }
            });
    }
    getAll() {
        return this.http.get(this.config.apiUrl + '/post/getPosts', this.jwt())
            .map((response: Response) => {
                let postsList = response.json();
               if (postsList) {
                    return postsList;
                }
            });
    }
    removePost(_id) {
        return this.http.delete(this.config.apiUrl + '/post/deletePost/' + _id, this.jwt())
            .map((response: Response) => {
                let poststatus = response;
               if (poststatus) {
                    return poststatus;
                }
            });
    }
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}