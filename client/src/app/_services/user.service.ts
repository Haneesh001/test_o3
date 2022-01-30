import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8085/userApi/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  getContactList(): Observable<any> {
    return this.http.get(API_URL + '/contact-list');
  }
  deleteContactList(contacts_id: BigInteger): Observable<any> {
    return this.http.post(API_URL + '/deleteContactApi',{contacts_id:contacts_id});
  }
  register(contacts_name: string, contacts_email: string, contacts_number: string): Observable<any> {
    return this.http.post(API_URL + 'createContact', {
      
      contacts_name, contacts_email, contacts_number

    });
  }

 
 
}
