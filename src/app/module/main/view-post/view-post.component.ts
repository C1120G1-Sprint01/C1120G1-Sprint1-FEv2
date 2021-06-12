import {Component, OnInit} from '@angular/core';
import {Post} from '../../../model/Post';
import {ServicePostService} from '../../../service/service-post/service-post.service';
import {DateUtilService} from '../../../service/date-util/date-util.service';
import {CommonUtilService} from '../../../service/common-util/common-util.service';
import {SecurityService} from '../../../service/security/security.service';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from 'src/app/model/User';
import {Account} from "../../../model/Account";
import { Room } from 'src/app/model/room';
import { TokenStorageService } from 'src/app/service/security/token-storage.service';
import { ChatService } from 'src/app/service/chat-box/chat.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  defaultImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/post' +
    '%2F423-4235598_no-image-for-noimage-icon.png?alt=media&token=8a43d08c-2bb8-4fa0-8715-ea5fd99c8baa';
  defaultAvatarUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/user' +
    '%2Favatar-default.jpg?alt=media&token=01daacde-be86-4c45-a508-577edcdd9aa0';
  notFoundImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/layout' +
    '%2Fpost-not-found.png?alt=media&token=d75c4dcd-136c-4504-b74f-ac4ca12139d7';

  post: Post;
  postAddress: string = '';
  userAddress: string = '';
  timeDiff: string = '';
  categorySlug: string = '';
  childCategorySlug: string = '';
  account: Account;
  user: User;
  room: Room;

  constructor(private postService: ServicePostService,
              private dateUtilService: DateUtilService,
              private commonUtilService: CommonUtilService,
              private securityService: SecurityService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.postService.getActivePostById(id).subscribe(data => {
      let userWard = data.user.ward.wardName;
      let userDistrict = data.user.ward.district.districtName;
      let userProvince = data.user.ward.district.province.provinceName;

      let postWard = data.ward.wardName;
      let postDistrict = data.ward.district.districtName;
      let postProvince = data.ward.district.province.provinceName;
      let postDateTime = data.postDateTime;
      let postCategory = data.childCategory.category.categoryName;
      let postChildCategory = data.childCategory.childCategoryName;

      this.post = data;
      this.postAddress = [postWard, postDistrict, postProvince].join(', ');
      this.userAddress = [userWard, userDistrict, userProvince].join(', ');
      this.timeDiff = this.dateUtilService.getDiffToNow(postDateTime);
      this.categorySlug = this.commonUtilService.convertToSlug(postCategory);
      this.childCategorySlug = this.commonUtilService.convertToSlug(postChildCategory);

      console.log(data);
    });
  }

  async goToChat() {
    let username = this.tokenStorage.getUser();
      await new Promise((resolve) => {
        if (username != null) {
          this.chatService.findAccountByUserName(username.username).subscribe(data => {
            this.account = {
              username: data.username,
              password: data.password,
              registerDate: data.registerDate,
              user: data.user
            };
            this.user = data.user;
            return resolve(1);
          });
        }
      });
      if (this.account) {
        this.chatService.refRoomsCus.orderByChild('roomName').equalTo(this.account.username).on('value', (resp: any) => {
          if (!resp.exists()) {
            const room = new Room(this.account.username, this.user, 0);
            // const room = new Room("Room" + this.post.user.userId, this.user, 0);
            this.chatService.addNewRoomCus(room);
          }
        });
      }
    this.router.navigateByUrl('/customer/inbox');
  }

}
