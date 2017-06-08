import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';
import { UsersService } from '../users.service';
import { Post } from './post';
import { PostComment } from './post-comment';

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
    postsLoading = true;
    commentsLoading = true;
    postSelected = false;
    selectedPost = new Post();
    selectedPostComments: PostComment[];
    users = [];

    constructor(private _postsService: PostsService, private _usersService: UsersService) {}

    ngOnInit() {
        this._postsService.getPosts()
            .subscribe(posts => {
                this.posts = posts;
                this.postsLoading = false;
            });
        this._usersService.getUsers()
            .subscribe(users =>
                this.users = users);
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

    updatePostsByUser(userId) {
        this.postsLoading = true;
        if (userId == "all") {
            this._postsService.getPosts()
                .subscribe(posts => {
                    this.posts = posts;
                    this.postsLoading = false;
                });
        } else {
            this._postsService.getPostsByUser(userId)
                .subscribe(posts => {
                    this.posts = posts;
                    this.postsLoading = false;
                })
        }
    }
}