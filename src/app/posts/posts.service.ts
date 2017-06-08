import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post } from './post';
import { PostComment } from './post-comment';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

@Injectable()
export class PostsService {
    private postsUrl = 'http://jsonplaceholder.typicode.com/posts';

    constructor(private _http: Http) {}

    getPosts(filter?) : Observable<Post[]> {
        let url = this.postsUrl;

        if (filter && filter.userId)
            url += "?userId=" + filter.userId;
        return this._http.get(url)
            .map(res => res.json());
    }

    getPostsByUser(userId) {
        return this._http.get(this.postsUrl + '?userId=' + userId)
            .map(res => res.json());
    }

    getPostComments(postId) : Observable<PostComment[]>{
        return this._http.get(this.postsUrl + "/" + postId + "/comments")
            .map(res => res.json());
    }
}