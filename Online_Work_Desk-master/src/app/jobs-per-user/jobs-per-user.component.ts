import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Job } from '../models/job.model';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-jobs-per-user',
  templateUrl: './jobs-per-user.component.html',
  styleUrls: ['./jobs-per-user.component.css']
})
export class JobsPerUserComponent implements OnInit {

  jobs: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  allJobs: Job[] = [];
  allImages: any[] = [];
  currJob: Job = <Job>{};
  dataReceived:any
  email:any
  x:any
  w:any

  constructor(private jobService: JobService, private _sanitizer: DomSanitizer,private asd:AuthServiceService,private route: Router) { }

  ngOnInit(): void {
    this.email=this.asd.getEmail()
    
    this.asd.getuserbyemail(this.email).subscribe((response)=>{
      this.dataReceived=response
           console.log(this.dataReceived
          )
        this.x=this.dataReceived.userId
          this.jobService.getJobsPostedByUser(this.dataReceived.userId).subscribe({
            next: (jobs) => {
              console.log(jobs)
              
              this.allJobs = jobs;
              this.allJobs.forEach((job) => {
                this.allImages.push(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + job.jobImageUrl));
                console.log(this.allImages[this.allImages.length-1]);
              });
              //this.allJobs.forEach((job) => console.log(job.jobImageUrl));
            }
          });
        },
        (err:HttpErrorResponse)=>{
          console.log(err)}
      )
 
  }
seeapplicationsforthisjob(x:number) {
  this.jobService.seeapplicationsforthisjob(this.x).subscribe((response)=>{
    this.w=this.x
  })
   
 }

}