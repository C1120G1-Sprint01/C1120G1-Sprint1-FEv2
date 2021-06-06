import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from 'src/app/model/Post';

@Injectable({
  providedIn: 'root'
})
export class ServiceCustomerService {

  httpOptions: any;

  private API_URL = 'http://localhost:8080/';
  private API_URL_LIST = 'http://localhost:8080/api/posts';

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  // findAllPostByUsername(page: number, username: string): Observable<Post[]> {
  //   return this.httpClient.get<Post[]>(`${this.API_URL_LIST}/cus-post-list?page=${page}&&username=${username}`);
  // }

  findAllPostByUsername(page: number, username: string, statusId): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL_LIST}/cus-post-list?page=${page}&&username=${username}&&statusId=${statusId}`);
  }

  findPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_URL_LIST}/cus-post/${id}`);
  }

  updatePost(post: Post): Observable<Post> {
    console.log(post);
    return this.httpClient.post<Post>(`${this.API_URL_LIST}/cus-post-edit`, post);
  }

  /**
   * Author: ThuanNN, ViNTT
   * Save a new post
   */
  savePost(post: Post, username: string): Observable<void> {
    console.log(post);
    console.log(username);
    return this.httpClient.post<void>(`${this.API_URL_LIST}/createPost`, {post, username});
  }

  public searchPostByName(posterName: string): Observable<any> {
    return this.httpClient.get(this.API_URL_LIST + '/search/' + posterName);
  }

}
