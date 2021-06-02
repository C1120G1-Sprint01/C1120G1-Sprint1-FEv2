import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {Ward} from '../../../../model/Ward';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  rfEditForm: FormGroup;
  public users: User[] = [];
  public accounts: Account[] = [];
  public wards: Ward[] = [];
  id: number = 0;

  constructor(private serviceAdminService: ServiceAdminService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log('id edit ' + this.id);
    this.serviceAdminService.getUserById(this.id).subscribe(data => {
      this.rfEditForm.patchValue(data);
    });
    this.getAllWard();
    this.rfEditForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$')]],
      phone: ['', [Validators.required, Validators.pattern('(^(090)\\d{7}$)|(^(091)\\d{7}$)|(^(\\+\\(84\\) 90)\\d{7}$)|(^(\\+\\(84\\) 91)\\d{7}$)')]],
      ward: ['', [Validators.required]]
    });
  }

  logout() {

  }

  onSubmit() {
    console.log(this.rfEditForm.value);
    this.serviceAdminService.editUser(this.rfEditForm.value, this.id).subscribe(data => {
      this.router.navigateByUrl('/admin-management-user');
    }, error => {
      alert('Error !');
    });
  }

  getAllWard() {
    this.serviceAdminService.getAllWard().subscribe(data => {
      this.wards = data;
    });
  }

  backToUserList() {
    this.router.navigate(['admin/listUser']);
  }

}
