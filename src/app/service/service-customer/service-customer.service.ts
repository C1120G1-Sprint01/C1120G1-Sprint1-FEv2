import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from 'src/app/model/Post';
import { PostDTO } from 'src/app/model/PostDTO';

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

  findAllPostByUsername(page: number, username: string, statusId): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_URL_LIST}/cus-post-list?page=${page}&&username=${username}&&statusId=${statusId}`);
  }

  findPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_URL_LIST}/cus-post/${id}`);
  }

  updatePost(postDTO: PostDTO): Observable<PostDTO> {
    return this.httpClient.post<PostDTO>(`${this.API_URL_LIST}/cus-post-edit`, postDTO);
  }

  savePost(post: Post): Observable<void> {
    console.log('Title' + post.title);
    console.log('Child' + post.childCategory);
    return this.httpClient.post<void>(`${this.API_URL_LIST}/createPost`, post);
  }

  public searchPostByName(posterName: string): Observable<any> {
    return this.httpClient.get(this.API_URL_LIST + '/search/' + posterName );
  }

  getUserStatistic(startDate: string, endDate: string): Observable<any> {
    console.log(startDate + endDate);
    return this.httpClient.get(this.API_URL + 'statistic' + '?startDate=' + startDate + '&endDate=' + endDate);
  }
}
