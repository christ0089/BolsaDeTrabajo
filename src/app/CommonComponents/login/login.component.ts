import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/Shared/Auth/auth.service";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"],
  selector: "login",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {
    const user = this.loginForm.value;
    this.auth.emailAuth(user.email, user.password).then((user) => {

      console.log(user.user.emailVerified)
      if (user.user.emailVerified == true) {
        this.router.navigateByUrl("/")
      } else {
        this.auth.sendVerificationEmail(user.user)
        this.snackbar
          .open(
            "Te enviamos un correo para que verifiques tu cuenta"
          )
          ._dismissAfter(3000);
      }
    }).catch((e) => {
      this.snackbar
        .open(e.message)
        ._dismissAfter(3000);
    });
  }

}
