import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../services/backend.service';
import { BehaviourService } from '../services/behaviour.service';

@Component({
  selector: 'app-create-election',
  templateUrl: './create-election.component.html',
  styleUrls: ['./create-election.component.css']
})
export class CreateElectionComponent implements OnInit {
minDate = new Date()
loading = false
error = ''
constructor(public behaviourService: BehaviourService, public backend: BackendService, public dialogRef: MatDialogRef<CreateElectionComponent>) { }
public createForm = new FormGroup({
  title: new FormControl('', Validators.required),
  start_date: new FormControl('', Validators.required),
  end_date: new FormControl('', Validators.required)
})

  ngOnInit(): void {
  }

  create(): void{
    if (this.createForm.valid) {
      this.behaviourService.user.subscribe((user:any)=>{
          this.createForm.value.user_id = user.user_id
      })
      console.log(this.createForm.value)
      this.loading = true
      this.backend.createElection(this.createForm.value).subscribe((res:any)=>{
        console.log(res)
        if (res.msg == 'Success') {
          this.dialogRef.close()
        } else {
          this.loading = false
          this.error = res.msg
        }
      }, (err:any)=>{
        if(err){
          this.loading = false
          console.log(err)
          this.error = err.statusText
        }
      })
    } else { }
  }

}
