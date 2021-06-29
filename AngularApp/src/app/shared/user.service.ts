import { Injectable } from '@angular/core';

import {HttpClient }from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import {RegistrationData} from './registration-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURL ='http://localhost:28976/api';
  

  register (registrationData: RegistrationData) { 
  return this.http.post(this.BaseURL +'/User/Register', registrationData );
  }
}


