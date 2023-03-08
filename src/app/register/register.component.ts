import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true
  loading = false

  constructor(public backend: BackendService, public router: Router) { }
  public error = ''
  public registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    orgName: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  register(){
    if(this.registerForm.status == 'VALID'){
      this.loading = true
      console.log(this.registerForm.value)
      this.backend.register(this.registerForm.value).subscribe((res:any)=>{
        console.log(res)
        if (res.msg == 'Success') {
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
    }else{}
  }

}
