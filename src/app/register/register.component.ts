import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true

  constructor(public backend: BackendService) { }
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
      console.log(this.registerForm.value)
      this.backend.register(this.registerForm.value).subscribe((res:any)=>{
        console.log(res)
      })
    }else{}
  }

}
