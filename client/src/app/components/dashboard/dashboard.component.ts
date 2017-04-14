import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService, AlertService } from '../../service/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loading = false;
  currentUser: any;
  posts: any;
  categories: any = [];

  constructor(private postService: PostService, private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.categories = ['Education', 'Entertainment', 'Business', 'Technology', 'Teaching'];
  }

  ngOnInit() {
    this.loadPosts()
  }

  private loadPosts() {
    this.postService.getAll()
      .subscribe(
      posts => {
        this.posts = posts.posts;
        console.log('this.posts', this.posts)
      }, error => {
        this.alertService.error(error._body);
      });

  }

  createPost(valid: any, value: any) {
    this.loading = true;
    event.preventDefault();
    if (!valid || (value.postTitle === undefined)) return;
    console.log()
    value.userId = this.currentUser._id
    this.postService.createPost(value)
      .subscribe(
      data => {
        this.loadPosts();
        this.loading = false;
      },
      error => {
        this.alertService.error(error._body);
        this.loading = false;
      });
  }

  removePost(id) {
    this.postService.removePost(id)
      .subscribe(
      data => {
        this.loadPosts();
        this.loading = false;
      },
      error => {
        this.alertService.error(error._body);
        this.loading = false;
      });
  }

}
