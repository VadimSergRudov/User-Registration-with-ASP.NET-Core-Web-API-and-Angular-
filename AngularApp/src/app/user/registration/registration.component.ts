import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegistrationData } from 'src/app/shared/registration-data';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, public service: UserService, private toastr: ToastrService) { }
  formData: RegistrationData = new RegistrationData();
  registrationForm!: FormGroup;
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName : ['',Validators.required],
      userEmail: ['',[Validators.required,Validators.email]],
      fullName: ['',Validators.required],
      passwords: this.fb.group({
        password:['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword:['',[Validators.required]]
      }, {validator: this.passwordMatcher})
    })
  }

  get userName() {return this.registrationForm.get('userName')!;}
  get userEmail() {return this.registrationForm.get('userEmail')!;}
  get fullName() {return this.registrationForm.get('fullName')!;}
 
  //get password() {return this.registrationForm.get('passwords')!;}
  //get confirmPassword() {return this.registrationForm.get('confirmPassword')!;}

  passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = c.get('password');
    const confirmControl = c.get('confirmPassword');
  
    if (passwordControl!.pristine || confirmControl!.pristine) {
      return null;
    }
  
    if (passwordControl!.value === confirmControl!.value) {
      return null;
    }
    return { 'match': true };
  }
  onSubmit(){
    this.formData.userName = this.registrationForm.value.userName;
    this.formData.email = this.registrationForm.value.userEmail;
    this.formData.password = this.registrationForm.value.passwords.password;
    this.formData.fullName = this.registrationForm.value.fullName;

    this.service.register(this.formData).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.registrationForm.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach((element:any) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
    
  }
}


