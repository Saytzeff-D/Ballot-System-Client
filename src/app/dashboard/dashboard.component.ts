import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { CreateElectionComponent } from '../create-election/create-election.component';
import { BehaviourService } from '../services/behaviour.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
  loading = true
  public orgName:any;
  public userId:any;
  public electionTray:any = [];
  public error:any = ''
  public selected:any = ''

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, public behaviorService: BehaviourService, public backend: BackendService) {}

  ngOnInit(): void{
    this.behaviorService.user.subscribe((user:any)=>{
      this.userId = user.user_id
      this.orgName = user.orgName
    })
    this.fetchElections()
  }

  fetchElections(): void{
    this.loading = true
    this.backend.fetchElection({userId: this.userId}).subscribe((res:any)=>{
      this.electionTray = res.data
      console.log(res.data)
      this.loading = false
      sessionStorage.getItem('selectedElection') !== null ? this.selected == JSON.parse(sessionStorage.getItem('selectedElection')!) : this.selected = ''
    }, (err)=>{
      if(err){
        this.loading = false
        this.error = 'Temporarily unable to fetch from the server'
      }
    })
  }

  createElection(): void{
   const dialogRef = this.dialog.open(
      CreateElectionComponent,
      {
        width: '400px',
        closeOnNavigation: false,
        disableClose: true
      }
    )
    dialogRef.afterClosed().subscribe((res)=>{
      this.fetchElections()
    })
  }

  selectElection(title:any){
    this.selected = title
    sessionStorage.setItem('selectedElection', JSON.stringify(title))
  }
}
