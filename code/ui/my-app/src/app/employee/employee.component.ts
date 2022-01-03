import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http:HttpClient) { }

  departments:any=[];
  employees:any=[];

  modalTitle ="";
  EmployeeId = 0;
  FirstName = "";
  LastName = "";
  Department="";
  Email="";
  Phone="";
  Adress="";
  DateOfJoining="";
  PhotoFileName="anonymous.png";
  PhotoPath=environment.PHOTO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'employee')
    .subscribe(data=>{
      this.employees=data;
    });

    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    });
  }

  addClick(){
    this.modalTitle="Add Employee";
    this.EmployeeId=0;
    this.FirstName="";
    this.LastName="";
    this.Department="";
    this.Email="";
    this.Phone="";
    this.Adress="";
    this.DateOfJoining="";
    this.PhotoFileName="anonymous.png";
  }

  editClick(emp:any){
    this.modalTitle="Edit Employee";
    this.EmployeeId=emp.EmployeeId;
    this.FirstName=emp.FirstName;
    this.LastName=emp.LastName;
    this.Department=emp.Department;
    this.Email=emp.Email;
    this.Phone=emp.Phone;
    this.Adress=emp.Adress;
    this.DateOfJoining=emp.DateOfJoining;
    this.PhotoFileName=emp.PhotoFileName;
  }

  createClick(){
    var val={
      FirstName:this.FirstName,
      LastName:this.LastName,
      Department:this.Department,
      Email:this.Email,
      Phone:this.Phone,
      Adress:this.Adress,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };

    this.http.post(environment.API_URL+'employee',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val={
      EmployeeId:this.EmployeeId,
      FirstName:this.FirstName,
      LastName:this.LastName,
      Department:this.Department,
      Email:this.Email,
      Phone:this.Phone,
      Adress:this.Adress,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };

    this.http.put(environment.API_URL+'employee',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
    this.http.delete(environment.API_URL+'employee/'+id)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
    }
  }


  imageUpload(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);
    
    this.http.post(environment.API_URL+'employee/SaveFile',formData)
    .subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
    });
  }

}