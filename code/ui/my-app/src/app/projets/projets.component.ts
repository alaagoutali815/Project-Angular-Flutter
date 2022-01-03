import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {

  constructor(private http:HttpClient) { }

  projets:any=[];
  employees:any=[];

  modalTitle ="";
  ProjetId = 0;
  NameProject ="";
  Deadline = "";
  AffectTo="";
  HoursProjet="";
  Company="";
  PhotoFileName="anonymous.png";
  PhotoPath=environment.PHOTO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'projet')
    .subscribe(data=>{
      this.projets=data;
    });

    this.http.get<any>(environment.API_URL+'employee')
    .subscribe(data=>{
      this.employees=data;
    });
  }

  addClick(){
    this.modalTitle="Add Projet";
    this.ProjetId=0;
    this.NameProject= "";
    this.Deadline="";
    this.AffectTo="";
    this.HoursProjet="";
    this.Company="";
    this.PhotoFileName="anonymous.png";
  }

  editClick(projet:any){
    this.modalTitle="Edit Projet";
    this.ProjetId=projet.ProjetId;
    this.NameProject=projet.NameProject;
    this.Deadline=projet.Deadline;
    this.AffectTo=projet.AffectTo;
    this.HoursProjet=projet.HoursProjet;
    this.Company=projet.Company;
    this.PhotoFileName=projet.PhotoFileName;
  }

  createClick(){
    var val={
      NameProject:this.NameProject,
      Deadline:this.Deadline,
      AffectTo:this.AffectTo,
      HoursProjet:this.HoursProjet,
      Company:this.Company,
      PhotoFileName:this.PhotoFileName
    };

    this.http.post(environment.API_URL+'projet',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val={
      NameProject:this.NameProject,
      Deadline:this.Deadline,
      AffectTo:this.AffectTo,
      HoursProjet:this.HoursProjet,
      Company:this.Company,
      PhotoFileName:this.PhotoFileName
    };

    this.http.put(environment.API_URL+'projet',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
    this.http.delete(environment.API_URL+'projet/'+id)
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
    
    this.http.post(environment.API_URL+'projet/SaveFile',formData)
    .subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
    });
  }

}
