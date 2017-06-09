import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';
import { UsersService } from '../users.service';
import { Post } from './post';
import { PostComment } from './post-comment';

import * as _ from 'underscore';

@Component({
    templateUrl: './posts.component.html',
    styles: [`
        .list-group-item:hover {
            cursor: pointer;
            background-color: #ecf0f1;
        }
        .media-object {
            border-radius: 100%;
        }
    `]
})
export class PostsComponent implements OnInit {
    posts: Post[];
    postsLoading : Boolean;
    commentsLoading = true;
    postSelected = false;
    selectedPost = new Post();
    selectedPostComments: PostComment[];
    users = [];
    pagedPosts = [];
    pageSize = 5;

    constructor(private _postsService: PostsService, private _usersService: UsersService) {}

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    loadUsers() {
        this._usersService.getUsers()
            .subscribe(users =>
                this.users = users);
    }

    loadPosts(filter?) {
        this.postsLoading = true;
        this._postsService.getPosts(filter)
            .subscribe(posts => {
                this.posts = posts;
                this.pagedPosts = _.take(this.posts, this.pageSize);
            },
            null,
            () => { this.postsLoading = false; });
    }

    selectPost(post) {
        this.commentsLoading = true;
        this.selectedPostComments = [];
        this.selectedPost = post;
        this.postSelected = true;
        this._postsService.getPostComments(post.id)
            .subscribe(comments => {
                this.selectedPostComments = comments;
                this.commentsLoading = false;
            });
    }

    updatePostsByUser(filter) {
        this.posts = null;
        this.loadPosts(filter);
    }

    onPageChange(e) {
        var startIndex = (e.newPage - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
    }
}