import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-election',
  templateUrl: './create-election.component.html',
  styleUrls: ['./create-election.component.css']
})
export class CreateElectionComponent implements OnInit {
minDate = new Date()
  constructor() { }
  public createForm = new FormGroup({
    title: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  })

  ngOnInit(): void {
  }

}
