import { Component, Input } from '@angular/core';
import { UserService } from './user.service';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms'
import { User } from './user.model';
import { NgForm } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { RowContext } from '@angular/cdk/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
 @Input() displayActionItems: any = [];

  ActionItemID: string = "";
  EntityID: string = "";
  EntityName: string = "";
  DeliveryLead: string = "";
  DeliveryManager: string = "";
  Category: string = "";
  SubCategory: string = "";
  ActionItemType:string = "";
  Severity: string = "";
  CompletionStatus: string = "";
  title = 'data-service';
  formValue!: FormGroup;
  row:any;
  userObj : User = new User();
  displayedColumns : string[] = [
    'ActionItemID', 
    'EntityID' ,
    'EntityName', 
    'DeliveryLead', 
    'DeliveryManager', 
    'Category', 
    'SubCategory', 
    'ActionItemType', 
    'Severity', 
    'CompletionStatus', 
    'UpdateEntry'];
    dataSource:any;
    showAdd!:boolean;
    showUpdate!:boolean;
  constructor(public userService: UserService, public formbuilder: FormBuilder) { 
 } 

  ngOnInit() {

    this.formValue = this.formbuilder.group({
    ActionItemID:  [''],
    EntityID:  [''],
    EntityName:  [''],
    DeliveryLead:  [''],
    DeliveryManager:  [''],
    Category:  [''],
    SubCategory:  [''],
    ActionItemType: [''],
    Severity:  [''],
    CompletionStatus:  ['']
    
    });
  
    this.getAllUsers();
  }


  getAllUsers() {
    this.userService.getActionItems().subscribe(res=>{
      this.displayActionItems = res.body;
      this.dataSource = new MatTableDataSource(this.displayActionItems);
    
    }, err => {
      console.log(err);
    });
   
  }

  onSubmit = (form: FormGroup) => {
    console.log('submit form');
    console.log(form.value);
    console.log(form.value.requestType);

    this.userService.getActionItems().subscribe(
      (res) => {
        console.log('get all action items');
        console.log(res.body);
        const allActionItems : any = res.body;
        const actionItemValue : any = {
        'id': allActionItems.length,
        'ActionItemID':  this.formValue.value.ActionItemID,
        'EntityID':  this.formValue.value.EntityID,
        'EntityName': this.formValue.value.EntityName,
        'DeliveryLead': this.formValue.value.DeliveryLead,
        'DeliveryManager':  this.formValue.value.DeliveryManager,
        'Category': this.formValue.value.Category,
        'SubCategory': this.formValue.value.SubCategory,
        'ActionItemType':  this.formValue.value.ActionItemType,
        'Severity':  this.formValue.value.Severity,
        'CompletionStatus': this.formValue.value.CompletionStatus,
       
        }

        console.log('action item values');
        console.log(actionItemValue);



        this.userService.addActionItem(actionItemValue).subscribe(
          (data:any) => {
            console.log(data);
            alert(data.body.message);
            let ref = document.getElementById('cancel')
            ref?.click();
            this.formValue.reset();
            this.getAllUsers();
          },
          (err) => {
            console.log(err);
          }
        );

        // this.getTickets = res.body.documents[0].entities;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  
  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.userObj.id=row.id;
    this.formValue.controls['ActionItemID'].setValue(row.ActionItemID);
    this.formValue.controls['EntityID'].setValue(row.EntityID);
    this.formValue.controls['EntityName'].setValue(row.EntityName);
    this.formValue.controls['DeliveryLead'].setValue(row.DeliveryLead);
    this.formValue.controls['DeliveryManager'].setValue(row.DeliveryManager);
    this.formValue.controls['Category'].setValue(row.Category);
    this.formValue.controls['SubCategory'].setValue(row.SubCategory);
    this.formValue.controls['ActionItemType'].setValue(row.ActionItemType);
    this.formValue.controls['Severity'].setValue(row.Severity);
    this.formValue.controls['CompletionStatus'].setValue(row.CompletionStatus);
   
  }
  
 onUpdate(){

  const newActionItem : any = {
  ActionItemID: this.formValue.value.ActionItemID,
   EntityID: this.formValue.value.EntityID,
   EntityName: this.formValue.value.EntityName,
    DeliveryLead: this.formValue.value.DeliveryLead,
    DeliveryManager: this.formValue.value.DeliveryManager,
    Category: this.formValue.value.Category,
   SubCategory: this.formValue.value.SubCategory,
    ActionItemType: this.formValue.value.ActionItemType,
   Severity: this.formValue.value.Severity,
    CompletionStatus: this.formValue.value.CompletionStatus,
  }
  console.log(newActionItem)
  this.userService.updateActionItem(this.userObj.id,newActionItem)
  .subscribe(res=>{
    alert("Updated Sucessfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllUsers();

  })
 }
   
closeDialog(){
  this.formValue.reset();

}

removeActionItem(row:any){
  this.userObj.id=row.id;
  this.userService.deleteActionItem(row.id)
  .subscribe(res=>{
    alert("Deleted Sucessfully");
    console.log(this.displayActionItems);
    this.getAllUsers();
  })
}

    




 


//  onSubmit() {
//   console.log(this.formValue.value)
//   this.userObj.ActionItemID = this.formValue.value.ActionItemID;
//   this.userObj.EntityID = this.formValue.value.EntityID;
//   this.userObj.EntityName = this.formValue.value.EntityName;
//   this.userObj.DeliveryLead = this.formValue.value.DeliveryLead;
//   this.userObj.DeliveryManager = this.formValue.value.DeliveryManager;
//   this.userObj.Category = this.formValue.value.Category;
//   this.userObj.SubCategory = this.formValue.value.SubCategory;
//   this.userObj.ActionItemType = this.formValue.value.ActionItemType;
//   this.userObj.Severity = this.formValue.value.Severity;
//   this.userObj.CompletionStatus = this.formValue.value.CompletionStatus;

  
//   this.userService.addUser(this.userObj)
//   .subscribe(res=>{
//     console.log(res);
//     alert("Action Item added successfully")
//     let ref = document.getElementById('cancel')
//     ref?.click();
//     this.formValue.reset();
//     this.getAllUsers();
//   },
//   err=>{
//     alert("Something went wrong!");
//   })
//   }

  // deleteUser(row:any){
  //   this.userService.deleteUser(row.id).subscribe(res=>{
  //     alert("Action Item Deleted!")
  //     this.getAllUsers();
  //   })
  // }



  // updateUser() {
  // console.log(this.formValue.value)
  // this.userObj.ActionItemID = this.formValue.value.ActionItemID;
  // this.userObj.EntityID = this.formValue.value.EntityID;
  // this.userObj.EntityName = this.formValue.value.EntityName;
  // this.userObj.DeliveryLead = this.formValue.value.DeliveryLead;
  // this.userObj.DeliveryManager = this.formValue.value.DeliveryManager;
  // this.userObj.Category = this.formValue.value.Category;
  // this.userObj.SubCategory = this.formValue.value.SubCategory;
  // this.userObj.ActionItemType = this.formValue.value.ActionItemType;
  // this.userObj.Severity = this.formValue.value.Severity;
  // this.userObj.CompletionStatus = this.formValue.value.CompletionStatus;
    
  //   this.userService.updateUser(this.userObj, this.userObj.id)
  //   .subscribe(res=>{
  //     alert("Updated Sucessfully");
  //     let ref = document.getElementById('cancel')
  //     ref?.click();
  //     this.formValue.reset();
  //     this.getAllUsers();
  
  //   })
  
  // }

  
}

