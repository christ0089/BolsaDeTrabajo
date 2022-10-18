import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
// import { AuthService } from "src/app/providers/Auth/AuthService";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/Shared/Auth/auth.service";

@Component({
  templateUrl: "pass_reset.component.html",
  styleUrls: ["pass_reset.component.scss"],
  selector: "pass_reset",
})
export class PassRestComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ["", Validators.required]
  });
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

  pwdVerfifyPassword() {
    this.snackbar
      .open(
        "Te enviamos un correo para que cambies tú contraseña"
      )
      ._dismissAfter(3000);
    this.auth.passResetEmail(this.f['email'].value).then(() => {
      this.router.navigate(["auth"]);
    }).catch(e => console.error(e));
  }


}
