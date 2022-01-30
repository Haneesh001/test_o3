import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoardUserComponent } from '../board-user/board-user.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   content:any =[];
  isLoggedIn = false;
  constructor(private userService: UserService,private dialog: MatDialog) { }

  ngOnInit(): void {
   
   this.getContactDetails();
  }
  reloadPage(): void {
    window.location.reload();
  }
  getContactDetails(){
   this.isLoggedIn=true
    this.userService.getContactList().subscribe(
      data => {
        this.content = data.data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  gotoCustomer(){
    //this.router.navigate(['']
    this.dialog.open(BoardUserComponent, {
      maxHeight: '98vh',
      disableClose: true,
      // data: data
    
    }).afterClosed().subscribe(res => {
      // console.log(res);
      if ((res && res.data) || res.success) {
        // console.log(res);
        this.getContactDetails();
      }
    });
  }
  deleteCustomer(item:any)
  {
    this.userService.deleteContactList(item.contacts_id).subscribe((e:any)=>{e.message; this.getContactDetails();})
  }
}
