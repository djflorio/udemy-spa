import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user.component';
import { PostsComponent } from './posts/posts.component';
import { SpinnerComponent } from './spinner.component';
import { PaginationComponent } from './pagination/pagination.component';

import { UsersService } from './users.service';
import { PostsService } from './posts/posts.service';
import { PreventUnsavedChangesGuard } from './prevent-unsaved-changes-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  {
    path: 'users/:id',
    component: AddUserComponent,
    canDeactivate: [ PreventUnsavedChangesGuard ]
  },
  {
    path: 'users/new',
    component: AddUserComponent,
    canDeactivate: [ PreventUnsavedChangesGuard ]
  },
  { path: 'posts', component: PostsComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UsersComponent,
    AddUserComponent,
    PostsComponent,
    SpinnerComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UsersService,
    PostsService,
    PreventUnsavedChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
