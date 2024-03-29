import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../model/Post';

@Injectable({
  providedIn: 'root'
})
export class ServicePostService {
  httpOptions: any;
  private API_BASE_URL = 'http://localhost:8080/api/posts';
  private API_POST_LIST_URL = 'http://localhost:8080/api/posts/listPost';

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

  getListPost(count: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.API_POST_LIST_URL}/${count}`);
  }

  /**
   * Author: ViNTT
   * Get post detail
   */
  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_BASE_URL}/${id}`);
  }

  /**
   * Author: ViNTT
   * Get data for Post Details Page
   */
  getActivePostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_BASE_URL}/${id}/active`);
  }

  getAdminPage(): Observable<any> {
    return this.httpClient.get(this.API_BASE_URL, this.httpOptions);
  }

  getAllPostListDetail(): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/listDetail', this.httpOptions);
  }

  getAllPostListApprove(): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/listApprove', this.httpOptions);
  }

  getPostDetailByIndex(postId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/listDetail/' + postId, this.httpOptions);
  }

  searchByTitle(titles: string): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/listDetail/searchByTitle?title=' + titles, this.httpOptions);
  }

  getPostApproveByIndex(postId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/listApprove/' + postId, this.httpOptions);
  }

  getPostWaitByIndex(postId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/listWait/' + postId, this.httpOptions);
  }

  approvePost(postId: number): Observable<any> {
    return this.httpClient.put(this.API_BASE_URL + '/listApprove/approve/' + postId, this.httpOptions);
  }

  cancelApprovePost(postId: number): Observable<any> {
    return this.httpClient.put(this.API_BASE_URL + '/listDetail/cancelApprove/' + postId, this.httpOptions);
  }

  deletePost(postId: number): Observable<any> {
    return this.httpClient.delete<any>(this.API_BASE_URL + '/listApprove/delete/' + postId, this.httpOptions);
  }

  waitPost(postId: number): Observable<any> {
    return this.httpClient.put(this.API_BASE_URL + '/listApprove/wait/' + postId, this.httpOptions);
  }

  getAllPostListWait(): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/listWait', this.httpOptions);
  }

  approveWait(postId: number): Observable<any> {
    return this.httpClient.put(this.API_BASE_URL + '/listWait/approve/' + postId, this.httpOptions);
  }

  deleteWait(postId: number): Observable<any> {
    return this.httpClient.delete<any>(this.API_BASE_URL + '/listWait/delete/' + postId, this.httpOptions);
  }

  /**
   * Author: ViNTT
   * Get data for List Post By Category Page
   */
  getAllByCategoryName(category: string, page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_BASE_URL}/category/${category}?page=${page}`);
  }

  /**
   * Author: ViNTT
   * Get data for List Post By Child Category Page
   */
  getAllByCategoryNameAndChildCategoryName(category: string, childCategory: string, page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_BASE_URL}/category/${category}/${childCategory}?page=${page}`);
  }

  /**
   * Author: ThuanNN
   * Get data for List Post By Category Load More style
   */
  getAllPostByCategoryName(category: string, count: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_BASE_URL}/categories/${category}/${count}`);
  }

  /**
   * Author: ThuanNN
   * Get data for List Post By Child Category Load More style
   */
  getAllPostByCategoryNameAndChildCategoryName(category: string, childCategory: string, count: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_BASE_URL}/categories/${category}/${childCategory}/${count}`);
  }

  getQuantityStatistic(startDate: string, endDate: string): Observable<any> {
    console.log(startDate + endDate)
    return this.httpClient.get(this.API_BASE_URL + '/statistic' + '?startDate=' + startDate + '&endDate=' + endDate);
  }

  findAll(page: number, size: number, onSorting: boolean, textSorting: string): Observable<any> {
    return this.httpClient.get(this.API_BASE_URL + '/list/' + '?page=' + page + '&size=' + size + '&onSorting=' + onSorting + '&textSorting=' + textSorting);
  }

  deleteByIdPost(deleteId: number): Observable<Post> {
    return this.httpClient.delete<Post>(this.API_BASE_URL + '/list/' + deleteId);
  }

  searchPostByTitle(title: string): Observable<Post> {
    return this.httpClient.get<Post>(this.API_BASE_URL+ "/search/title?" + 'keySearch=' + title)
  }
}
