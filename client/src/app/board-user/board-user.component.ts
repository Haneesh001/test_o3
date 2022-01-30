import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  form: any = {
    contacts_name: null,
    contacts_email: null,
    contacts_number: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private userService: UserService,private router: Router,
    private dialogRef: MatDialogRef<BoardUserComponent>) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    // this.userService.getUserBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }
  
  onSubmit(): void {
    const { contacts_name, contacts_email, contacts_number } = this.form;

    this.userService.register(contacts_name, contacts_email, contacts_number).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  back(){
    this.dialogRef.close();
  }
  reset(){
 
  }
  // closeDialog() {
  //   this.dialogRef.close();
  // }
}
