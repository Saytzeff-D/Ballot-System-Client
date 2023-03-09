import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true

  constructor(public backend: BackendService, public router: Router) { }
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })
  public loading = false;
  public error:any = ''

  ngOnInit(): void {
  }

  login(): void{
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.loading = true
      console.log(this.loginForm.value)
      this.backend.login(this.loginForm.value).subscribe((res:any)=>{
        console.log(res)
        if (res.msg == 'Success') {
          sessionStorage.setItem('user', JSON.stringify(res.data))
          this.router.navigate(['/account/dashboard'])
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
