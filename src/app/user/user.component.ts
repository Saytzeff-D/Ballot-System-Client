import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BehaviourService } from '../services/behaviour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    public user:any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public behaviorService: BehaviourService,
    public router: Router
    ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (sessionStorage.getItem('user') !== null) {
      this.behaviorService.user.next(JSON.parse(sessionStorage.getItem('user')!))
    } else {
      this.router.navigate(['/login'])
    }
  }

}
